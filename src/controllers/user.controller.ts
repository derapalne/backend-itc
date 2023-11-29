import {
  Controller,
  Get,
  HttpException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param() params: any) {
    try {
      const id = params.id;
      return await this.userService.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('active')
  getActiveUser(@Request() req) {
    // Fix "any" typing
    return { request: req.user };
  }
}
