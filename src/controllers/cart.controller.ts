import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CartService } from 'src/services/cart.service';

@Controller('carts')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneById(@Param('id') id: number, @Request() req) {
    try {
      const userId = req.user.userId;
      const cart = await this.cartService.getCartById(id);
      if (cart.user_id !== userId) throw new HttpException('Unauthorized', 403);
      return cart;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message ? error.message : 'Server error',
        error.statusCode ? error.statusCode : 500,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  async addProductToActiveCart(@Body() body, @Request() req) {
    try {
      let activeCart = await this.cartService.getActiveCartByUserId(
        req.user.userId,
      );
      if (!activeCart)
        activeCart = await this.cartService.createCart({
          name: 'New Cart',
          user_id: req.user.userId,
        });
      const productId = body.product_id;
      if (!productId) throw new HttpException('Missing product Id', 400);
      const insertOk = await this.cartService.addProductToCart(
        activeCart.id,
        productId,
      );
      return {
        success: true,
        message: 'Relation created successfully',
        cart_id: insertOk.cart_id,
        product_id: insertOk.product_id,
      };
    } catch (error) {
      if (error.message) throw new HttpException(error.message, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  async removeProductFromActiveCart(@Body() body, @Request() req) {
    try {
      const activeCart = await this.cartService.getActiveCartByUserId(
        req.user.userId,
      );
      if (!activeCart) throw new HttpException('No active cart found', 404);
      const productId = body.product_id;
      if (!productId) throw new HttpException('Missing product Id', 400);
      const insertOk = await this.cartService.removeProductFromCart(
        activeCart.id,
        productId,
      );
      return {
        success: true,
        message: 'Relation deleted successfully',
        entriesDeleted: insertOk,
      };
    } catch (error) {
      if (error.message) throw new HttpException(error.message, 500);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/order')
  async orderCartById(@Param('id') id: number, @Request() req) {
    try {
      const userId = req.user.userId;
      const cart = await this.cartService.getCartById(id);
      if (cart.user_id !== userId) throw new HttpException('Unauthorized', 403);
      const orderOk = await this.cartService.markCartAsOrderedById(id);
      return orderOk;
    } catch (error) {
      throw new HttpException(
        error.message ? error.message : 'Server error',
        error.statusCode ? error.statusCode : 500,
      );
    }
  }
}
