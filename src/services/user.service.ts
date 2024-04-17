/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from '../entities/user.entity';
import * as fs from 'fs'; // Importa el módulo fs

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { id } };
    return this.userRepository.findOne(options);
  }

  async updateUser(
    id: number,
    updateUserDto: Partial<User>,
  ): Promise<User | undefined> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { email } };
    return this.userRepository.findOne(options);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { username } };
    return this.userRepository.findOne(options);
  }

  async createBulkUsers(): Promise<void> {
    const userData = fs.readFileSync('./users.json', 'utf-8'); // Ruta modificada
    const users: User[] = JSON.parse(userData);

    for (const user of users) {
      const newUser = new User();
      newUser.username = user.username;
      newUser.email = user.email;
      await newUser.setPassword(user.passwordHash); // Asegúrate de que los datos en users.json incluyan la contraseña sin cifrar
      newUser.role = user.role;

      await this.userRepository.save(newUser);
    }
  }
}
