import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  subject: string;

  @Column()
  link: string;

  @Column({ default: null })
  writer?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @OneToMany(() => Tag, (tag) => tag.post, { cascade: true })
  tags?: Tag[];
}
