export interface IUserSearch {
  id: number;
  title: string;
  value: string;
  user_id: number;
  creationDate: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface CreateUserSearchDto {
  title: string;
  value: string;
  user_id: number;
}
