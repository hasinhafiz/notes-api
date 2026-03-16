import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return body;
  }
}
