import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { literal } from 'sequelize';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dto';
import { Brand } from 'src/models/brand.model';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand)
    private brandModel: typeof Brand,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandModel.findAll();
  }

  async findById(id: number): Promise<Brand> {
    return this.brandModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Product,
          attributes: {
            include: [
              [
                literal(
                  `(SELECT COUNT(pp.id) FROM product_point pp WHERE pp.product_id = product.id AND pp.deletedAt IS NULL)`,
                ),
                'n_points',
              ],
            ],
          },
          order: [['n_points', 'DESC']],
          separate: true,
          include: [
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
        },
      ],
    });
  }

  async create(brand: CreateBrandDto) {
    return await this.brandModel.create<Brand>(brand as any);
  }

  async updateById(brand: UpdateBrandDto) {
    return await this.brandModel.update(brand, {
      where: {
        id: brand.id,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    const brand = await this.findById(id);
    return await brand.destroy();
  }

  async truncateTable(): Promise<number> {
    return this.brandModel.destroy({ truncate: true });
  }
}
