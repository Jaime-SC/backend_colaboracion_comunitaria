/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;

  @Column()
  ubicacion: string;

  @ManyToOne(() => User, (user) => user.createdResources)
  usuario: User;

  @ManyToMany(() => User)
  @JoinTable()
  reservas: User[];
}
