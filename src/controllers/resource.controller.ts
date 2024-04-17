import { Controller, Get, Post, Body } from '@nestjs/common';
import { ResourceService } from '../services/resource.service';
import { Resource } from '../entities/resource.entity';

@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  async findAll(): Promise<Resource[]> {
    return this.resourceService.findAllResources();
  }

  @Post()
  async create(@Body() resource: Resource): Promise<Resource> {
    return this.resourceService.createResource(resource);
  }
}
