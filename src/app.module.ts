/* eslint-disable prettier/prettier */
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user.controller';
import { Volunteering } from './entities/volunteering.entity';
import { VolunteeringService } from './services/volunteering.service';
import { VolunteeringController } from './controllers/volunteering.controller';
import { Resource } from './entities/resource.entity';
import { ResourceService } from './services/resource.service';
import { ResourceController } from './controllers/resource.controller';
import { Booking } from './entities/booking.entity';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';
import { Project } from './entities/project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { Collaboration } from './entities/collaboration.entity';
import { CollaborationService } from './services/collaboration.service';
import { CollaborationController } from './controllers/collaboration.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'colaboracion_comunitaria',
      entities: [User, Volunteering, Resource, Booking, Project, Collaboration],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Volunteering,
      Resource,
      Booking,
      Project,
      Collaboration,
    ]),
    JwtModule.register({
      secret: 'tu-secreto',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [
    AppController,
    UserController,
    VolunteeringController,
    ResourceController,
    BookingController,
    ProjectController,
    CollaborationController,
  ],
  providers: [
    AppService,
    AuthService,
    JwtStrategy,
    UserService,
    VolunteeringService,
    ResourceService,
    BookingService,
    ProjectService,
    CollaborationService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    // private readonly volunteeringService: VolunteeringService,
    // private readonly userService: UserService, // Inyectamos el servicio de usuario
  ) {}

  async onModuleInit() {
    // await this.volunteeringService.createBulkVolunteerings();
    // await this.userService.createBulkUsers(); // Llamada al método para insertar datos de usuario
  }
}
