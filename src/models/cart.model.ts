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
  Default,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Product } from './product.model';
import { CartProduct } from './cartProduct.model';

@Table({
  tableName: 'cart',
})
export class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Default(true)
  @AllowNull(false)
  @Column
  is_active: boolean;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => CartProduct)
  products: Product[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
