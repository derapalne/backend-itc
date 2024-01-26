import {
  Column,
  Model,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';
import { ProductTag } from 'src/product/tag/productTag.model';

@Table({
  tableName: 'tag',
})
export class Tag extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  active: boolean;

  @BelongsToMany(() => Product, () => ProductTag)
  products: Product[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
