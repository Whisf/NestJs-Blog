import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'nestjs-prisma';
import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [
        AuthModule
    ],
    controllers: [PostController],
    providers: [PrismaService, PostService]
})
export class PostModule {}
