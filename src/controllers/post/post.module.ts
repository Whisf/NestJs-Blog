import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'nestjs-prisma';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { PostController } from './post.controller';
import { PostService } from '../../services/post.service';

@Module({
    imports: [
        AuthModule
    ],
    controllers: [PostController],
    providers: [PrismaService, PostService]
})
export class PostModule {}
