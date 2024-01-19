export interface IProductPoint {
  id: number;
  reason: string;
  value: number;
  product_id: number;
  creationDate: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreateProductPointDto {
  reason: string;
  value: number;
  product_id: number;
}
