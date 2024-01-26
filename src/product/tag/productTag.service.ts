import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductTag } from './productTag.model';

@Injectable()
export class ProductTagService {
  constructor(
    @InjectModel(ProductTag) private productTagModel: typeof ProductTag,
  ) {}

  async assignTagToProductById(productId: number, tagId: number) {
    return await this.productTagModel.create<ProductTag>({
      product_id: productId,
      tag_id: tagId,
    } as any);
  }

  async removeAllTagsFromProductById(productId: number) {
    return await this.productTagModel.destroy({
      where: { productId: productId },
      force: true,
    });
  }

  async removeTagFromProductById(productId: number, tagId: number) {
    return await this.productTagModel.destroy({
      where: { product_id: productId, tag_id: tagId },
      force: true,
    });
  }
}
