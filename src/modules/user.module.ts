import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserController } from 'src/controllers/user.controller';
import { UserSearchService } from 'src/services/userSearch.service';
import { UserSearch } from 'src/models/userSearch.model';
import { Cart } from 'src/models/cart.model';
import { CartService } from 'src/services/cart.service';
import { CartProduct } from 'src/models/cartProduct.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSearch, Cart, CartProduct])],
  providers: [UserService, UserSearchService, CartService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
