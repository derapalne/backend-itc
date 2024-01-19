import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InitController } from 'src/init/init.controller';
import { Brand } from 'src/brand/brand.model';
import { Product } from 'src/product/product.model';
import { User } from 'src/user/user.model';
import { BrandService } from 'src/brand/brand.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, Brand, User])],
  providers: [ProductService, BrandService, UserService],
  controllers: [InitController],
})
export class InitModule {}
