import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Post as PostModel, User as UserModel} from '@prisma/client';
import { User } from 'src/decorators/user.decorator';
import { PostService } from '../../services/post.service';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreatePostBody, CreatePostDto } from 'src/models/post.models';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PostController {
    constructor(private postService: PostService){}
    @Get()
    @ApiOperation({ summary: 'Get all posts' })
    @ApiOkResponse({ description: 'List all posts' })
    @ApiUnauthorizedResponse()
    getAllPosts(): Promise<PostModel[]> {
        return this.postService.getAllPosts();
    }

    @ApiOperation({ summary: 'Get post by Id' })
    @ApiOkResponse({ description: 'Get Post'})
    @ApiUnauthorizedResponse()
    @ApiParam({
        type: String,
        name: 'id'
    })
    @Get(':id')
    getPostById(@Param() query: {id: string}) {
        return this.postService.getPost(query);
    }


    @ApiCreatedResponse({ description: 'Create post'})
    @ApiUnauthorizedResponse()
    @ApiBody({
        type: CreatePostBody
    })
    @Post('/createPost')
    createPost(@Body() data: CreatePostDto, @User() user: any): Promise<PostModel> {
        return this.postService.createPost(data, user);
    }

    @ApiOkResponse({ description: 'delete post' })
    @ApiUnauthorizedResponse()
    @ApiParam({
        type: String,
        name: 'id'
    })
    @Delete('/deletePost/:id')
    deletePost(@Param() data: {id: string}): Promise<PostModel> {
        return this.postService.deletePost(data)
    }

    @ApiOperation({ summary: 'Update post'})
    @ApiOkResponse({ description: 'Update post'})
    @ApiUnauthorizedResponse()
    @ApiBody({
        type: CreatePostBody
    })
    @ApiParam({
        type: String,
        name: 'id',
    })
    @Patch('/:id')
    updatePost(@Param() id: {id: string}, @Body() data: {title: string, content: string}): Promise<PostModel> {
        return this.postService.updatePost(id, data);
    }
}
