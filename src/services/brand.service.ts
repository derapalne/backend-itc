import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dto';
import { Brand } from 'src/models/brand.model';

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
