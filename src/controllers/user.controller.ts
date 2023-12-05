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
import { UserSearchService } from 'src/services/userSearch.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userSearchService: UserSearchService,
  ) {}
  @Get('/')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('active')
  getActiveUser(@Request() req) {
    // Fix "any" typing
    return { request: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/searchs')
  async getActiveUsersSearchs(@Request() req) {
    try {
      // Fix "any" typing
      return await this.userSearchService.getAllSearchsById(req.user.userId);
    } catch (error) {
      if (error.message) throw new HttpException(error.message, 500);
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/last-search')
  async getActiveUsersLastSearch(@Request() req) {
    try {
      // Fix "any" typing
      return await this.userSearchService.getUserLastSearch(req.user.userId);
    } catch (error) {
      if (error.message) throw new HttpException(error.message, 500);
      throw new HttpException(error, 500);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.userService.findById(id);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
