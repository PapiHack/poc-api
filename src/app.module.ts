import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './modules/author/author.module';
import { PostModule } from './modules/post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthorModule,
    PostModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/poc'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
