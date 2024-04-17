/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(
    inputUsername: string,
    inputPassword: string,
  ): Promise<any> {
    // Aquí deberías implementar la lógica para validar el usuario
    // Por ejemplo, consultar en la base de datos y comparar contraseñas con bcrypt

    // Supongamos que tienes una función para buscar un usuario por username en tu base de datos
    const user = await this.findUserByUsername(inputUsername);

    if (user && (await bcrypt.compare(inputPassword, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Supongamos que tienes una función para buscar un usuario por username en tu base de datos
  private async findUserByUsername(username: string): Promise<any> {
    // Implementa la lógica para buscar un usuario en tu base de datos
    return null;
  }
}
