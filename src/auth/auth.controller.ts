import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }
}
