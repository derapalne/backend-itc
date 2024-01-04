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
  BelongsToMany,
} from 'sequelize-typescript';
import { Brand } from './brand.model';
import { User } from './user.model';
import { Cart } from './cart.model';
import { CartProduct } from './cartProduct.model';

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

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  creator_user_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Cart, () => CartProduct)
  carts: Cart[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
