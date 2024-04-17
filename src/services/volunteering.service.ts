import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Volunteering } from '../entities/volunteering.entity';
import * as fs from 'fs';

@Injectable()
export class VolunteeringService {
  constructor(
    @InjectRepository(Volunteering)
    private volunteeringRepository: Repository<Volunteering>,
  ) {}

  async createVolunteering(volunteering: Volunteering): Promise<Volunteering> {
    return await this.volunteeringRepository.save(volunteering);
  }

  async findAllVolunteerings(): Promise<Volunteering[]> {
    return await this.volunteeringRepository.find();
  }

  async findVolunteeringById(id: number): Promise<Volunteering | undefined> {
    const options: FindOneOptions<Volunteering> = {
      where: { id },
    };
    return await this.volunteeringRepository.findOne(options);
  }

  async updateVolunteering(
    id: number,
    volunteering: Volunteering,
  ): Promise<Volunteering | undefined> {
    await this.volunteeringRepository.update(id, volunteering);
    return this.findVolunteeringById(id);
  }

  async deleteVolunteering(id: number): Promise<void> {
    await this.volunteeringRepository.delete(id);
  }

  async createBulkVolunteerings(): Promise<void> {
    try {
      const data = fs.readFileSync('volunteerings.json', 'utf-8');
      const volunteerings: Volunteering[] = JSON.parse(data);
      await this.volunteeringRepository.save(volunteerings);
      console.log('Bulk volunteerings created successfully.');
    } catch (error) {
      console.error('Error creating bulk volunteerings:', error);
    }
  }
}
