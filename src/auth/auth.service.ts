import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
const bcrypt = require('bcrypt');
const saltrounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

  async signup(email: string, password: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length) {
      throw new BadRequestException("Email already in use!");
    }
    const hash = await bcrypt.hash(password, saltrounds);
    return this.usersService.create(email, hash);
  }
}
