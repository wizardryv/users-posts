import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { AdminOrPostOwnerGuard } from 'src/guards/admin-or-post-owner.guard';
import { PostOwnerGuard } from 'src/guards/post-owner.guard';
import { UpdatePostDto } from './dto/update-post-dto';
import { FindAllPostsQueryDto } from './dto/find-all-posts-query.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postsService.createOne(createPostDto, req.user.id);
  }
  
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query() findAllPostsQueryDto: FindAllPostsQueryDto
  ) {
    const { offset, limit, filter } = findAllPostsQueryDto;
    return this.postsService.findAll(offset, limit, filter);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminOrPostOwnerGuard)
  async deleteOne(
    @Param('id', ParseIntPipe) id: number
  ){
    return this.postsService.deleteOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, PostOwnerGuard)
  async updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto
  ){
    return this.postsService.updateOne(id, updatePostDto);
  }
}
