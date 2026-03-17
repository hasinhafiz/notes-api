import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');
const saltrounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signup(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException("Email already in use!");
    }
    const hash = await bcrypt.hash(password, saltrounds);
    return this.usersService.create(email, hash);
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

    return user;
  }
}
