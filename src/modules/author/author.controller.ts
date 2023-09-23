import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDTO, UpdateAuthorDTO } from '@papihack/dal-poc-library';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() createAuthorDTO: CreateAuthorDTO) {
    return this.authorService.create(createAuthorDTO);
  }

  @Get()
  async findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, updateAuthorDTO: UpdateAuthorDTO) {
    return this.authorService.update(id, updateAuthorDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authorService.delete(id);
  }
}
