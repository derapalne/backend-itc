import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from 'src/brand/brand.model';
import { BrandController } from 'src/brand/brand.controller';
import { BrandService } from 'src/brand/brand.service';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand, Product, User])],
  providers: [BrandService],
  controllers: [BrandController],
  exports: [BrandService],
})
export class BrandModule {}
