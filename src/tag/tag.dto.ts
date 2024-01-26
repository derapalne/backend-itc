export interface ITag {
  id: number;
  name: string;
  active: boolean;
}

export interface CreateTagDto {
  name: string;
  active: boolean;
}
