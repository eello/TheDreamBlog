import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  subject: string;

  @Column({ default: null })
  writer?: string;

  @Column({ charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  filename: string;

  @Column({ charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
  file_path: string;
}
