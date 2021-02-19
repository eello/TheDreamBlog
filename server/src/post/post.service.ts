import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';
import { Tag } from '../tag/tag.entity';
import { TagRepository } from 'src/tag/tag.repository';
import { LoggerService } from 'src/logger/logger.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly tagRepository: TagRepository,
    private readonly logger: LoggerService,
  ) {}

  async createPost(writer: string, post: CreatePostDto) {
    try {
      const { subject, link, thumbnailUrl } = post;
      const newPost: Post = { subject, link };
      if (thumbnailUrl) newPost.thumbnailUrl = thumbnailUrl;

      if (process.env.NODE_ENV === 'production') newPost.writer = writer;

      const createPostResult: Post = await this.postRepository.save(newPost);

      if (post.tags) {
        const tags: Tag[] = post.tags.map((t) => {
          const tag = new Tag();
          tag.tag = t;
          tag.post = createPostResult.id;
          return tag;
        });

        this.tagRepository.insertBulk(tags);
      }
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  getPostList(): Promise<Post[]> {
    try {
      return this.postRepository.find({ relations: ['tags'] });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async updatePost(id: number, post: UpdatePostDto) {
    const subject: string = post?.subject;
    const link: string = post?.link;
    const thumbnailUrl: string = post?.thumbnailUrl;

    const postToUpdate: Post = await this.postRepository.findOne(id);
    if (!postToUpdate) {
      this.logger.error(`Cannot found post id ${id}`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot found post id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (subject) postToUpdate.subject = subject;
    if (link) postToUpdate.link = link;
    if (thumbnailUrl) postToUpdate.thumbnailUrl = thumbnailUrl;

    if (subject || link || thumbnailUrl) this.postRepository.save(postToUpdate);

    try {
      let tags: string[] | Tag[] = post?.tags;
      if (tags) {
        tags = tags.map((t) => {
          const tag = new Tag();
          tag.post = id;
          tag.tag = t;
          return tag;
        });

        await this.tagRepository.delete({ post: id });
        this.tagRepository.insertBulk(tags);
      }
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async deletePost(id: number) {
    const postToDelete: Post = await this.postRepository.findOne(id);
    if (!postToDelete) {
      this.logger.error(`Cannot found post id ${id}`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot found post id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      this.postRepository.remove(postToDelete);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
