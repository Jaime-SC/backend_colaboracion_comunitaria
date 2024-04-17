import { Controller, Get, Post, Body } from '@nestjs/common';
import { CollaborationService } from '../services/collaboration.service';
import { Collaboration } from '../entities/collaboration.entity';

@Controller('collaboration')
export class CollaborationController {
  constructor(private collaborationService: CollaborationService) {}

  @Get()
  async findAll(): Promise<Collaboration[]> {
    return this.collaborationService.findAllCollaborations();
  }

  @Post()
  async create(@Body() collaboration: Collaboration): Promise<Collaboration> {
    return this.collaborationService.createCollaboration(collaboration);
  }
}
