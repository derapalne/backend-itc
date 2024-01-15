import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from 'src/controllers/cart.controller';
import { Cart } from 'src/models/cart.model';
import { CartProduct } from 'src/models/cartProduct.model';
import { CartService } from 'src/services/cart.service';

@Module({
  controllers: [CartController],
  imports: [SequelizeModule.forFeature([Cart, CartProduct])],
  providers: [CartService],
})
export class CartModule {}
