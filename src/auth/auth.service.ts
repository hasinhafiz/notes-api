import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');
const saltrounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  private toResponseDto(user: any) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async signup(email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException("Email already in use!");

    }
    const hash = await bcrypt.hash(password, saltrounds);
    const user = await this.usersService.create(email, hash);

    return this.toResponseDto(user);
  }

  async signin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const storedHash = user.password;
    const isMatch = await bcrypt.compare(password, storedHash);

    if (!isMatch) {
      throw new BadRequestException('Incorrect password!');
    }

    return this.toResponseDto(user);
  }
}
