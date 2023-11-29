import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Includeable, Op, literal } from 'sequelize';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Brand } from 'src/models/brand.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAll(name?: string, description?: string): Promise<Product[]> {
    // Create Include options object
    const includeOptions: Includeable[] = [
      Brand,
      {
        model: User,
        attributes: [
          'id',
          'username',
          [
            literal(
              `(SELECT COUNT(p.id) FROM product as p WHERE p.creator_user_id = user.id AND p.deletedAt IS NULL)`,
            ),
            'n_products',
          ],
        ],
      },
    ];
    // Si se trae nombre y descripción
    if (name && description) {
      return this.productModel.findAll({
        where: {
          [Op.or]: {
            name: { [Op.substring]: name },
            description: { [Op.substring]: description },
          },
        },
        include: includeOptions,
      });
      // Si solamente se trae nombre
    } else if (name && !description) {
      return this.productModel.findAll({
        where: { name: { [Op.substring]: name } },
        include: includeOptions,
      });
      // Si solamente se trae descripción
    } else if (!name && description) {
      return this.productModel.findAll({
        where: { description: { [Op.substring]: description } },
        include: includeOptions,
      });
      // Si no se trae ninguno
    } else {
      return this.productModel.findAll({
        include: includeOptions,
      });
    }
  }

  async findById(id: number): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id,
      },
      include: [
        Brand,
        {
          model: User,
          attributes: [
            'id',
            'username',
            [
              literal(
                `(SELECT COUNT(p.id) FROM product as p WHERE p.creator_user_id = user.id AND p.deletedAt IS NULL)`,
              ),
              'n_products',
            ],
          ],
        },
      ],
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

  async updateImageById(imageUrl: string, productId: string) {
    return await this.productModel.update(
      { image_url: imageUrl },
      { where: { id: productId } },
    );
  }

  async deleteById(id: number): Promise<void> {
    const product = await this.findById(id);
    return await product.destroy();
  }

  async findRandom(): Promise<Product> {
    return await this.productModel.findOne({
      order: literal('random()'),
      include: [
        Brand,
        {
          model: User,
          attributes: [
            'id',
            'username',
            [
              literal(
                `(SELECT COUNT(p.id) FROM product as p WHERE p.creator_user_id = user.id AND p.deletedAt IS NULL)`,
              ),
              'n_products',
            ],
          ],
        },
      ],
    });
  }

  async truncateTable(): Promise<number> {
    return await this.productModel.destroy({ truncate: true });
  }
}
