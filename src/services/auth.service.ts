import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { CreateUserDto, SignUserDto } from 'src/dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: SignUserDto): Promise<any> {
    try {
      const user = await this.userService.findByUsername(userDto.username);
      if (!user) throw new HttpException('User not found', 403);
      const validPassword = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (!validPassword)
        throw new HttpException("Credentials aren't valid", 403);
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env['JWT_SECRET'],
        }),
        userData: {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
      };
    } catch (error) {
      if (error.status) {
        throw new HttpException(error, error.status);
      }
      throw new HttpException(error, 500);
    }
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.createUser(createUserDto);
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env['JWT_SECRET'],
        }),
        userData: {
          username: user.username,
          isAdmin: user.isAdmin,
        },
      };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
