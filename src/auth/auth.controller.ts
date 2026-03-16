import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
  ) { }
  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }
}
