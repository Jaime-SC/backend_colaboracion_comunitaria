import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Collaboration } from '../entities/collaboration.entity';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectRepository(Collaboration)
    private collaborationRepository: Repository<Collaboration>,
  ) {}

  async createCollaboration(
    collaboration: Collaboration,
  ): Promise<Collaboration> {
    return await this.collaborationRepository.save(collaboration);
  }

  async findAllCollaborations(): Promise<Collaboration[]> {
    return await this.collaborationRepository.find();
  }

  async findCollaborationById(id: number): Promise<Collaboration | undefined> {
    const options: FindOneOptions<Collaboration> = {
      where: { id },
    };
    return await this.collaborationRepository.findOne(options);
  }

  async updateCollaboration(
    id: number,
    collaboration: Collaboration,
  ): Promise<Collaboration | undefined> {
    await this.collaborationRepository.update(id, collaboration);
    return this.findCollaborationById(id);
  }

  async deleteCollaboration(id: number): Promise<void> {
    await this.collaborationRepository.delete(id);
  }
}
