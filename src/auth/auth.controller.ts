import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { CreateUserDto, SignUserDto } from 'src/user/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: SignUserDto) {
    try {
      const isAuthorized = await this.authService.signIn(loginUserDto);
      if (!isAuthorized) throw new HttpException('User is not authorized', 403);
      await this.userService.updateLastLogin(isAuthorized.userData.id);
      return isAuthorized;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error, error.status);
      }
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
