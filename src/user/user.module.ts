import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { UserController } from 'src/user/user.controller';
import { UserSearchService } from 'src/user/search/userSearch.service';
import { UserSearch } from 'src/user/search/userSearch.model';
import { Cart } from 'src/cart/cart.model';
import { CartService } from 'src/cart/cart.service';
import { CartProduct } from 'src/cart/product/cartProduct.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSearch, Cart, CartProduct])],
  providers: [UserService, UserSearchService, CartService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
