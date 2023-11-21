import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, literal } from 'sequelize';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Brand } from 'src/models/brand.model';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAll(name?: string, description?: string): Promise<Product[]> {
    // Si se trae nombre y descripción
    if (name && description) {
      return this.productModel.findAll({
        where: {
          [Op.or]: {
            name: { [Op.substring]: name },
            description: { [Op.substring]: description },
          },
        },
        include: Brand,
      });
      // Si solamente se trae nombre
    } else if (name && !description) {
      return this.productModel.findAll({
        where: { name: { [Op.substring]: name } },
        include: Brand,
      });
      // Si solamente se trae descripción
    } else if (!name && description) {
      return this.productModel.findAll({
        where: { description: { [Op.substring]: description } },
        include: Brand,
      });
      // Si no se trae ninguno
    } else {
      return this.productModel.findAll({ include: Brand });
    }
  }

  async findById(id: number): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id,
      },
      include: Brand,
    });
  }

  async create(product: CreateProductDto) {
    return await this.productModel.create<Product>(product as any);
  }

  async updateById(product: UpdateProductDto) {
    return await this.productModel.update(product, {
      where: {
        id: product.id,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    const product = await this.findById(id);
    return await product.destroy();
  }

  async findRandom(): Promise<Product> {
    return await this.productModel.findOne({
      order: literal('random()'),
      include: Brand,
    });
  }

  async truncateTable(): Promise<number> {
    return await this.productModel.destroy({ truncate: true });
  }
}
