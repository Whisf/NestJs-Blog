import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, User, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'nestjs-prisma';
import { CreatePostDto } from 'src/models/post.models';

@Injectable()
export class PostService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getAllPosts(): Promise<Post[]> {
        return this.prisma.post.findMany({});
    }

    async createPost(data: CreatePostDto, user: User ): Promise<Post> {
        console.log(user)
        console.log(data)
        try {
            return await this.prisma.post.create({
                data: {
                    ...data,
                    authorId: user.id
                }
            })
        } catch (error) {
            console.log(error);
            throw new Error
        }
    }

    async deletePost(postId: {id: string}): Promise<Post> {
        try {
            return this.prisma.post.delete({where: {id: postId.id}});
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P205'
              ) {
                throw new NotFoundException(`No user for email ${postId.id}`);
              }
              throw error;
        }
    }

    async updatePost(id: {id: string}, data: {}): Promise<any> {
        try {
            return this.prisma.post.update({
                where: {id: id.id},
                data: {
                    ...data,
                }
            })
            } catch (error) {
            
        }
    }
    getPost(query: {id: string}): Promise<Post> {
        return this.prisma.post.findUnique({where: {id: query.id}})
    }

}
