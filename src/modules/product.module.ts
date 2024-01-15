import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';
import { UserSearch } from 'src/models/userSearch.model';
import { UserSearchService } from 'src/services/userSearch.service';
import { ProductPoint } from 'src/models/productPoints.model';
import { ProductPointService } from 'src/services/productPoint.service';
import { CartProduct } from 'src/models/cartProduct.model';
import { CartProductService } from 'src/services/cartProduct.service';
import { Cart } from 'src/models/cart.model';

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
