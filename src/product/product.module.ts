import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/product/product.model';
import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';
import { UserSearch } from 'src/user/search/userSearch.model';
import { UserSearchService } from 'src/user/search/userSearch.service';
import { ProductPoint } from 'src/product/point/productPoint.model';
import { ProductPointService } from 'src/product/point/productPoint.service';
import { CartProduct } from 'src/cart/product/cartProduct.model';
import { CartProductService } from 'src/cart/product/cartProduct.service';
import { Cart } from 'src/cart/cart.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Product,
      UserSearch,
      ProductPoint,
      CartProduct,
      Cart,
    ]),
  ],
  providers: [
    ProductService,
    UserSearchService,
    ProductPointService,
    CartProductService,
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
