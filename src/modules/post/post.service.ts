import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, CreatePostDTO, UpdatePostDTO } from '@papihack/dal-poc-library';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(createPostDTO: CreatePostDTO) {
    const post = await this.postModel.create({
      ...createPostDTO,
      author: new Types.ObjectId(createPostDTO.author),
    });
    await post.populate('author');
    return post.toJSON();
  }

  async findAll() {
    const posts = await this.postModel.find({}).populate('author').exec();

    if (posts.length) {
      return posts.map((post) => post.toJSON());
    }
    return [];
  }

  async findOne(id: string) {
    const post = await this.postModel
      .findOne({ _id: id })
      .populate('author')
      .exec();

    if (!post) {
      throw new NotFoundException(`Post with id #${id} does not exist.`);
    }

    return post.toJSON();
  }

  async update(id: string, updatePostDTO: UpdatePostDTO) {
    const post = await this.postModel
      .findOneAndUpdate({ _id: id }, { $set: updatePostDTO }, { new: true })
      .populate('author')
      .exec();

    if (!post) {
      throw new NotFoundException(`Post with id #${id} does not exist.`);
    }

    return post.toJSON();
  }

  async delete(id: string) {
    const post = await this.postModel
      .findOneAndRemove({ _id: id })
      .populate('author')
      .exec();

    if (!post) {
      throw new NotFoundException(`Post with id #${id} does not exist.`);
    }

    return post.toJSON();
  }
}
