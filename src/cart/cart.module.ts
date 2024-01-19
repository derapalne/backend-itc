import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { Cart } from './cart.model';
import { CartProduct } from 'src/cart/product/cartProduct.model';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  imports: [SequelizeModule.forFeature([Cart, CartProduct])],
  providers: [CartService],
})
export class CartModule {}
