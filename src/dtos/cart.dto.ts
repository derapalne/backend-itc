import { IProduct } from './product.dto';

export interface ICart {
  id: number;
  name: string;
  user_id: number;
  products: IProduct[];
  isActive: boolean;
}

export interface CreateCartDto {
  name: string;
  user_id: number;
}
