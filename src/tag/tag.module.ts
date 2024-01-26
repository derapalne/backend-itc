import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { Product } from 'src/product/product.model';
import { ProductTag } from 'src/product/tag/productTag.model';

@Module({
  imports: [SequelizeModule.forFeature([Tag, Product, ProductTag])],
  providers: [TagService],
  controllers: [TagController],
})
export class TagModule {}
