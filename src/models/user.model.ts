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
  HasMany,
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table({
  tableName: 'user',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column
  isAdmin: boolean;

  @HasMany(() => Product)
  products: Product[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  deletedAt: Date;
}
