import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from 'src/models/brand.model';
import { BrandController } from 'src/controllers/brand.controller';
import { BrandService } from 'src/services/brand.service';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand, Product, User])],
  providers: [BrandService],
  controllers: [BrandController],
  exports: [BrandService],
})
export class BrandModule {}
