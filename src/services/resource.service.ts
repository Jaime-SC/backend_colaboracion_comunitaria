import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Resource } from '../entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async createResource(resource: Resource): Promise<Resource> {
    return await this.resourceRepository.save(resource);
  }

  async findAllResources(): Promise<Resource[]> {
    return await this.resourceRepository.find();
  }

  async findResourceById(id: number): Promise<Resource | undefined> {
    const options: FindOneOptions<Resource> = {
      where: { id },
    };
    return await this.resourceRepository.findOne(options);
  }

  async updateResource(
    id: number,
    resource: Resource,
  ): Promise<Resource | undefined> {
    await this.resourceRepository.update(id, resource);
    return this.findResourceById(id);
  }

  async deleteResource(id: number): Promise<void> {
    await this.resourceRepository.delete(id);
  }
}
