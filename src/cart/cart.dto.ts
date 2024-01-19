import { IProduct } from '../product/product.dto';

export interface ICart {
  id: number;
  name: string;
  user_id: number;
  products: IProduct[];
  isActive: boolean;
  orderedOn?: Date;
}

export interface CreateCartDto {
  name: string;
  user_id: number;
}
