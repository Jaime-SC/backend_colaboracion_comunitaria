import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class Collaboration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.collaborations)
  usuario: User;

  @ManyToOne(() => Project, (project) => project.colaboradores)
  proyecto: Project;

  @Column()
  mensaje: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_colaboracion: Date;
}
