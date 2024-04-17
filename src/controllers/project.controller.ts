import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { Project } from '../entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return this.projectService.findAllProjects();
  }

  @Post()
  async create(@Body() project: Project): Promise<Project> {
    return this.projectService.createProject(project);
  }
}
