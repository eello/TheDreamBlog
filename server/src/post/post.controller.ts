import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('Posts')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPostList() {
    return this.postService.getPostList();
  }

  @Post()
  createPost(@Request() req, @Body() post: CreatePostDto) {
    const { user } = req;
    return this.postService.createPost(user, post);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  updatePost(@Param('id') id: number, @Body() post: UpdatePostDto) {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
