import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDTO, CreateAuthorDTO } from '@papihack/dal-poc-library';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('posts')
  // createPost(@Body() createPostDTO: CreatePostDTO) {
  //   return {
  //     operation: 'POST',
  //     payload: createPostDTO,
  //   };
  // }

  // @Post('authors')
  // createAuthor(@Body() createAuthorDTO: CreateAuthorDTO) {
  //   return {
  //     operation: 'POST',
  //     payload: createAuthorDTO,
  //   };
  // }
}
