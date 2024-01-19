export interface IBrand {
  id: number;
  name: string;
  logo_url: string;
}

export interface CreateBrandDto {
  name: string;
  logo_url: string;
}

export interface UpdateBrandDto {
  id: number;
  name: string;
  logo_url: string;
}

export interface DeleteBrandDto {
  id: number;
}
