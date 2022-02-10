import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { tokenDto } from '../controllers/auth/dto/token.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,    
    ) {}

    getUser(user: {email: string}): Promise<User|null> {
        return this.prisma.user.findUnique({where: {email: user.email}})
    }

    async createUser(data: Prisma.UserCreateInput): Promise<tokenDto> {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(data.password, salt);

        try {
            const user = await this.prisma.user.create({
                data: {
                    ...data,
                    password: hashPassword,
                    role: 'USER',
                },
            });

            return this.generateToken({
                userId: user.id,
                email: user.email
            })
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
              ) {
                throw new ConflictException(`Email ${data.email} already used.`);
              } else {
                throw new Error(error);
              }
        }
    }

    async signin(data: {email: string, password: string}): Promise<tokenDto> {
        const user = await this.getUser(data);

        if(!user) {
            throw new NotFoundException(`No user for email ${data.email}`);
        }

        const validatePassword = await bcrypt.compare(data.password, user.password);
        if(!validatePassword) {
            throw new BadRequestException('Invalid password');
        }

        return this.generateToken({userId: user.id, email: user.email})
    }

    generateToken(payload: { userId: string, email?: string}): tokenDto {
        return {
            accessToken: this.generateAccessToken(payload)
        }
    }

    private generateAccessToken(payload: {userId: string}): string {
        return this.jwtService.sign(payload);
    }

    private generateRefreshToken(payload: {userId: string}): string {
        return this.jwtService.sign(payload, {
            secret: "THIS_IS_THE_BEST_SECRET_KEY",
            expiresIn: '7d',
        })
    }

    refreshToken(token: string) {
        try {
            const { userId } = this.jwtService.verify(token, {
                secret: "THIS_IS_THE_BEST_SECRET_KEY" 
            });

            return this.generateToken({
                userId,
            })
        } catch(e) {
            throw new UnauthorizedException();
        }
    }
}
