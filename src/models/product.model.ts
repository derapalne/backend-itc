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
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { Brand } from './brand.model';

@Table({
  tableName: 'product',
})
export class Product extends Model {
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
  description: string;

  @AllowNull(false)
  @Column
  image_url: string;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @ForeignKey(() => Brand)
  @Column
  brand_id: number;

  @BelongsTo(() => Brand)
  brand: Brand;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
