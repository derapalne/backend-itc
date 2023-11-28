import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InitController } from 'src/controllers/init.controller';
import { Brand } from 'src/models/brand.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';
import { BrandService } from 'src/services/brand.service';
import { ProductService } from 'src/services/product.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, Brand, User])],
  providers: [ProductService, BrandService, UserService],
  controllers: [InitController],
})
export class InitModule {}
