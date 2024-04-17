import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Project } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  async findAllProjects(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async findProjectById(id: number): Promise<Project | undefined> {
    const options: FindOneOptions<Project> = {
      where: { id },
    };
    return await this.projectRepository.findOne(options);
  }

  async updateProject(
    id: number,
    project: Project,
  ): Promise<Project | undefined> {
    await this.projectRepository.update(id, project);
    return this.findProjectById(id);
  }

  async deleteProject(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
