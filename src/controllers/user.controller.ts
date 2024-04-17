import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
