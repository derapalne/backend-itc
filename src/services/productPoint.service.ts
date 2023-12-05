import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateProductPointDto,
  IProductPoint,
} from 'src/dtos/productPoint.dto';

import { ProductPoint } from 'src/models/productPoints.model';

@Injectable()
export class ProductPointService {
  constructor(
    @InjectModel(ProductPoint) private productPointModel: typeof ProductPoint,
  ) {}

  async getAllPoints(): Promise<IProductPoint[]> {
    return await this.productPointModel.findAll();
  }

  async getAllPointsByProductId(productId: number): Promise<IProductPoint[]> {
    return await this.productPointModel.findAll({
      where: { product_id: productId },
    });
  }

  async getLastPointByProductId(productId: number): Promise<IProductPoint> {
    return await this.productPointModel.findOne({
      where: { product_id: productId },
      order: [['id', 'DESC']],
      limit: 1,
    });
  }

  async createProductPoint(
    productPointDto: CreateProductPointDto,
  ): Promise<IProductPoint> {
    return await this.productPointModel.create(productPointDto as any);
  }
}
