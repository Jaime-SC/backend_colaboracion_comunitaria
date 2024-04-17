import { Controller, Get, Post, Body } from '@nestjs/common';
import { VolunteeringService } from '../services/volunteering.service';
import { Volunteering } from '../entities/volunteering.entity';

@Controller('volunteering')
export class VolunteeringController {
  constructor(private volunteeringService: VolunteeringService) {}

  @Get()
  async findAll(): Promise<Volunteering[]> {
    return this.volunteeringService.findAllVolunteerings();
  }

  @Post()
  async create(@Body() volunteering: Volunteering): Promise<Volunteering> {
    return this.volunteeringService.createVolunteering(volunteering);
  }
}
