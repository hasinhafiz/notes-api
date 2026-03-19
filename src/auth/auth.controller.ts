import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signup')
  @ApiOperation({ summary: "Register new user" })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "User created" })
  @ApiResponse({ status: 400, description: "Email already in use" })
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Sign-in' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: "Sign-in successful" })
  @ApiResponse({ status: 400, description: "Incorrect password" })
  @ApiResponse({ status: 404, description: "User not found" })
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  @ApiOperation({ summary: 'Sign-out' })
  @ApiResponse({ status: 201, description: "Sign-out successful" })
  signOut(@Session() session: any) {
    session.userId = null;
    return { message: 'Signed out' };
  }

  @Get('/whoami')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Check current user session' })
  @ApiResponse({ status: 200 })
  whoami(@Session() session: any) {
    return { userId: session.userId };
  }
}
