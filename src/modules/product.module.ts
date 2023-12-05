import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/services/product.service';
import { UserSearch } from 'src/models/userSearch.model';
import { UserSearchService } from 'src/services/userSearch.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, UserSearch])],
  providers: [ProductService, UserSearchService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
