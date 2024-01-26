export interface IProduct {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand_id: number;
  creator_user_id: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand_id: number;
  creator_user_id?: number;
  tags_ids?: number[];
}

export interface UpdateProductDto {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand_id: number;
  creator_user_id?: number;
  tags_ids?: number[];
}

export interface DeleteProductDto {
  id: number;
}
