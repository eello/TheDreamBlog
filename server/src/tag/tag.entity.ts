import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  tag: string;

  @ManyToOne(() => Post, (post) => post.tags, { onDelete: 'CASCADE' })
  post: number;
}
