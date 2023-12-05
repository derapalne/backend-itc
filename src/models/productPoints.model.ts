import {
  Model,
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table({
  tableName: 'product_point',
})
export class ProductPoint extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  reason: string;

  @AllowNull(false)
  @Column
  value: number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @BelongsTo(() => Product)
  product: Product;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
