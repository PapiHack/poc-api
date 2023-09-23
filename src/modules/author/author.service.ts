import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Author,
  CreateAuthorDTO,
  UpdateAuthorDTO,
} from '@papihack/dal-poc-library';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<Author>,
  ) {}

  async create(createAuthorDTO: CreateAuthorDTO) {
    const author = await this.authorModel.create(createAuthorDTO);
    return author.toJSON();
  }

  async findAll() {
    const authors = await this.authorModel.find({}).populate('posts').exec();

    if (authors.length) {
      return authors.map((author) => author.toJSON());
    }
    return [];
  }

  async findOne(id: string) {
    const author = await this.authorModel
      .findOne({ _id: id })
      .populate('posts')
      .exec();

    if (!author) {
      throw new NotFoundException(`Author with id #${id} does not exist.`);
    }

    return author.toJSON();
  }

  async update(id: string, updateAuthorDTO: UpdateAuthorDTO) {
    const author = await this.authorModel
      .findOneAndUpdate({ _id: id }, { $set: updateAuthorDTO }, { new: true })
      .populate('posts')
      .exec();

    if (!author) {
      throw new NotFoundException(`Author with id #${id} does not exist.`);
    }

    return author.toJSON();
  }

  async delete(id: string) {
    const author = await this.authorModel
      .findOneAndRemove({ _id: id })
      .populate('posts')
      .exec();

    if (!author) {
      throw new NotFoundException(`Author with id #${id} does not exist.`);
    }

    return author.toJSON();
  }
}
