import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {
    const FOLDER_PROJECTS = `${__dirname}/../../markdowns/projects`;
    !fs.existsSync(FOLDER_PROJECTS) && fs.mkdirSync(FOLDER_PROJECTS); // projects 폴더가 존재하지 않을 경우 생성
  }

  async getProjects(): Promise<Project[]> {
    const projects: Project[] = await this.projectRepository.find({
      select: ['id', 'subject', 'writer'],
    });

    return projects;
  }

  async getProject(id: number) {
    const project: Project = await this.projectRepository.findOne(id);
    const { subject, file_path } = project;

    const markdown = fs.readFileSync(file_path, 'utf8');
    return { subject, markdown };
  }

  createProject(subject: string, markdown: string) {
    const file_path = this.writeCodeIntoFile(subject, markdown);

    const project: Project = {
      subject,
      filename: subject,
      file_path,
    };

    this.projectRepository.save(project);
  }

  writeCodeIntoFile(subject: string, markdown: string) {
    const file_path = `${__dirname}/../../markdowns/projects/${subject}.md`;
    try {
      fs.writeFileSync(file_path, markdown);
      return file_path;
    } catch (err) {
      console.error(err);
    }
  }
}
