import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IncludeOptions, Op, WhereOptions, literal } from 'sequelize';
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

  async findAll(
    name?: string,
    description?: string,
    brand?: string,
  ): Promise<Product[]> {
    // Create Include options object
    const includeOptions: IncludeOptions[] = [
      { model: Brand, where: {} },
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
    // Create where options object
    let whereOptions: WhereOptions = {};
    // Add provided clauses
    if (name) whereOptions.name = { [Op.substring]: name };
    if (description) whereOptions.description = { [Op.substring]: description };
    // Add brand clause to includeOptions
    if (brand) includeOptions[0].where = { name: { [Op.substring]: brand } };
    // Add OR conditional if more than 1 present
    if (Object.keys(whereOptions).length > 1) {
      whereOptions = { [Op.or]: whereOptions };
    } else {
      whereOptions = whereOptions;
    }
    // If length is 1 or has OR conditional search with options
    if (Object.keys(whereOptions).length || Op.or in whereOptions) {
      return this.productModel.findAll({
        where: whereOptions,
        include: includeOptions,
      });
    }
    // Else search without filters
    return this.productModel.findAll({
      include: includeOptions,
    });
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
