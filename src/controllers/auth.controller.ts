import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { CreateUserDto, SignUserDto } from 'src/dtos/user.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: SignUserDto) {
    try {
      const isAuthorized = await this.authService.signIn(loginUserDto);
      if (!isAuthorized) throw new Error('User is not authorized');
      return isAuthorized;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @Post('signup')
  async signup(@Body() signupUserDto: CreateUserDto) {
    try {
      const userCreated = await this.authService.signUp(signupUserDto);
      if (userCreated) return userCreated;
      else throw new Error('Error creating user');
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
