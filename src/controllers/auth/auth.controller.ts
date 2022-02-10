import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {User as UserModel, Post as PostModel, Prisma } from '@prisma/client'; 
import { AuthService } from '../../services/auth.service';
import {ApiResponse, ApiBearerAuth, ApiOperation, ApiTags, ApiBody} from '@nestjs/swagger'
import { User } from './dto/user.entity';
import { tokenDto } from './dto/token.dto';
import { UserDto } from './dto/userLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Post('signup')
    @ApiOperation({ summary: 'Create at' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 200, description: 'Create user successful', type: tokenDto})
    @ApiBody({ 
        type: User
     })
    signup(@Body() data: Prisma.UserCreateInput) {
        return this.authService.createUser(data)
    }

    @Post('signin')
    @ApiOperation({ summary: 'Sign In' })
    @ApiResponse({ status: 403, description: 'Login failed'})
    @ApiResponse({ status: 200, description: 'Login Successful', type: tokenDto})
    @ApiBody({ 
        type: UserDto
    })
    signin(@Body() data: {email: string, password: string}) {
        return this.authService.signin(data)
    }
}
