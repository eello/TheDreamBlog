import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { LoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly logger: LoggerService,
  ) {
    const FOLDER_PROJECTS = `${__dirname}/../../markdowns/projects`;
    !fs.existsSync(FOLDER_PROJECTS) && fs.mkdirSync(FOLDER_PROJECTS); // projects 폴더가 존재하지 않을 경우 생성
  }

  async getProjects(): Promise<Project[]> {
    try {
      const projects: Project[] = await this.projectRepository.find({
        select: ['id', 'subject', 'writer'],
      });

      return projects;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getProject(id: number) {
    const project: Project = await this.projectRepository.findOne(id);
    if (!project) {
      this.logger.error(`Cannot found project id ${id}`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot found project id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { subject, file_path } = project;

    const markdown = fs.readFileSync(file_path, 'utf8');
    return { subject, markdown };
  }

  createProject(subject: string, markdown: string) {
    try {
      const file_path = this.writeCodeIntoFile(subject, markdown);

      const project: Project = {
        subject,
        filename: subject,
        file_path,
      };

      this.projectRepository.save(project);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  writeCodeIntoFile(subject: string, markdown: string) {
    const file_path = `${__dirname}/../../markdowns/projects/${subject}.md`;
    try {
      fs.writeFileSync(file_path, markdown);
      return file_path;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateProject(id: number, subject: string, markdonw: string) {
    const fileToUpdate: Project = await this.projectRepository.findOne(id);
    if (!fileToUpdate) {
      this.logger.error(`Cannot found project id ${id}`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot found project id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    let { file_path } = fileToUpdate;

    try {
      if (subject.length) {
        const new_file_path = `${__dirname}/../../markdowns/projects/${subject}.md`;

        await this.projectRepository.save({
          ...fileToUpdate,
          file_path: new_file_path,
        });

        fs.renameSync(file_path, new_file_path);
        file_path = new_file_path;
      }

      fs.writeFileSync(file_path, markdonw);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async deleteProject(id: number) {
    const fileToDelete: Project = await this.projectRepository.findOne(id);
    if (!fileToDelete) {
      this.logger.error(`error: Cannot found project id ${id}`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Cannot found project id ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const { file_path } = fileToDelete;

    try {
      fs.unlinkSync(file_path);
      await this.projectRepository.remove(fileToDelete);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
