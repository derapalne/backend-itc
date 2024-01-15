import {
  Controller,
  Get,
  HttpException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CartService } from 'src/services/cart.service';
import { UserService } from 'src/services/user.service';
import { UserSearchService } from 'src/services/userSearch.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userSearchService: UserSearchService,
    private cartService: CartService,
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
    // Fix "any" typing
    try {
      return await this.userSearchService.getUserLastSearch(req.user.userId);
    } catch (error) {
      if (error.message) throw new HttpException(error.message, 500);
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/active-cart')
  async getActiveCart(@Request() req) {
    // Fix "any" typing
    try {
      const cart = await this.cartService.getActiveCartByUserId(
        req.user.userId,
      );
      console.log('cart', cart);
      return cart ?? { id: 0, products: [] };
    } catch (error) {
      console.log(error);
      if (error.message) throw new HttpException(error.message, 500);
      throw new HttpException(error, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/ordered-carts')
  async getOrderedCarts(@Request() req) {
    // Fix "any" typing
    try {
      return await this.cartService.getOrderedCartsByUserId(req.user.userId);
    } catch (error) {
      console.log(error);
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
