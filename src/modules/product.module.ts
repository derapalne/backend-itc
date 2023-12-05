import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';
import { UserSearch } from 'src/models/userSearch.model';
import { UserSearchService } from 'src/services/userSearch.service';
import { ProductPoint } from 'src/models/productPoints.model';
import { ProductPointService } from 'src/services/productPoint.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, UserSearch, ProductPoint])],
  providers: [ProductService, UserSearchService, ProductPointService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
