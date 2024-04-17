import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Resource } from './resource.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp' })
  fecha_fin: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  usuario: User;

  @ManyToOne(() => Resource, (resource) => resource.reservas)
  recurso: Resource;
}
