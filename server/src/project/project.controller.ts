import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  //   UploadedFile,
  //   UseInterceptors,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import * as fs from 'fs';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  /** file upload 방식으로 할 경우 쓰이는 코드 */
  //   private DEST_PROJECTS = `${__dirname}/../../markdowns/projects`;

  //   constructor() {
  //     !fs.existsSync(this.DEST_PROJECTS) && fs.mkdirSync(this.DEST_PROJECTS); // server 폴더에 markdowns/procjects 폴더가 존재하지 않으면 생성
  //   }

  //   @Post('file')
  //   @UseInterceptors(
  //     FileInterceptor('project', {
  //       dest: `${__dirname}/../../markdowns/projects`,
  //     }),
  //   )
  //   uploadProjectFile(@Request() req, @UploadedFile() project) {
  //     // const { user } = req;
  //     console.log(project);
  //   }
  /** */

  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }

  @Get(':id')
  getProject(@Param('id') id: number) {
    return this.projectService.getProject(id);
  }

  @Post()
  uploadProject(@Request() req, @Body() project: CreateProjectDto) {
    const { user } = req;
    const { subject, markdown } = project;
    return this.projectService.createProject(user, subject, markdown);
  }

  @Patch(':id')
  updateProject(@Param('id') id: number, @Body() project: UpdateProjectDto) {
    const { subject, markdown } = project;
    return this.projectService.updateProject(id, subject, markdown);
  }

  @Delete(':id')
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id);
  }
}
