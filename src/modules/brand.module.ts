import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from 'src/models/brand.model';
import { BrandController } from 'src/controllers/brand.controller';
import { BrandService } from 'src/services/brand.service';

@Module({
  imports: [SequelizeModule.forFeature([Brand])],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
