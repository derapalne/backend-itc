export interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand_id: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand_id: number;
}

export interface UpdateProductDto {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  brand_id: number;
}

export interface DeleteProductDto {
  id: number;
}
