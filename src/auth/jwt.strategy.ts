import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(        
        private prisma: PrismaService,
        private authService: AuthService
    ,) {
        super({
            secretOrKey: 'bestsecretever',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: {email: string}): Promise<User> {
        const { email } = payload;
        const user: User = await this.authService.getUser({email: email});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}