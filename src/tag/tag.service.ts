import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tag.model';
import { CreateTagDto } from './tag.dto';
import { Op, literal } from 'sequelize';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private tagModel: typeof Tag) {}

  async createTag(createTagDto: CreateTagDto) {
    return await this.tagModel.create<Tag>(createTagDto as any);
  }

  async findAll() {
    return await this.tagModel.findAll({ where: { active: true } });
  }

  async findById(id: number) {
    return await this.tagModel.findOne({
      where: { id: +id, active: true },
    });
  }

  async findByName(name: string, limit?: number) {
    return await this.tagModel.findOne({
      where: {
        name: { [Op.like]: `%${name}%` },
        active: true,
      },
      order: literal(
        `(SELECT COUNT(*) FROM product_tag WHERE tag_id == tag.id)`,
      ),
      limit: limit ? limit : 10,
    });
  }

  async softDeleteById(id: number) {
    return await this.tagModel.update(
      { active: false },
      { where: { id: +id } },
    );
  }
}
