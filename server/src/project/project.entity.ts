import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  subject: string;

  @Column({ default: null })
  writer?: string;

  @Column()
  filename: string;

  @Column()
  file_path: string;
}
