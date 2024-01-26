import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import { Product } from '../../product/product.model';
import { Tag } from 'src/tag/tag.model';

@Table({
  tableName: 'product_tag',
})
export class ProductTag extends Model {
  @AllowNull(false)
  @ForeignKey(() => Tag)
  @Column
  tag_id: number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
