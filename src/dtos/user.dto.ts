export interface IUser {
  id: number;
  username: string;
  password: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  matchingPassword: string;
}

export interface SignUserDto {
  username: string;
  password: string;
}
