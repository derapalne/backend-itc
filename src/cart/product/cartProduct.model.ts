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
import { Cart } from '../cart.model';

@Table({
  tableName: 'cart_product',
})
export class CartProduct extends Model {
  @AllowNull(false)
  @ForeignKey(() => Cart)
  @Column
  cart_id: number;

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
