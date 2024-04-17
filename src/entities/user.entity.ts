import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Volunteering } from './volunteering.entity';
import { Resource } from './resource.entity';
import { Booking } from './booking.entity';
import { Project } from './project.entity';
import { Collaboration } from './collaboration.entity'; // Importamos la entidad Collaboration

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  role: string;

  @OneToMany(() => Volunteering, (volunteering) => volunteering.organizacion)
  createdVolunteerings: Volunteering[];

  @OneToMany(() => Resource, (resource) => resource.usuario)
  createdResources: Resource[];

  @OneToMany(() => Booking, (booking) => booking.usuario)
  bookings: Booking[];

  @OneToMany(() => Project, (project) => project.usuario)
  createdProjects: Project[];

  @OneToMany(() => Collaboration, (collaboration) => collaboration.usuario) // Añadimos la relación OneToMany con Collaboration
  collaborations: Collaboration[]; // Añadimos la propiedad collaborations

  async setPassword(password: string) {
    this.passwordHash = await bcrypt.hash(password, 10);
  }

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.passwordHash);
  }
}
