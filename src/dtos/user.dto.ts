export interface IUser {
  id: number;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface CreateUserDto {
  username: string;
  password: string;
  matchingPassword: string;
  isAdmin?: boolean;
}

export interface SignUserDto {
  username: string;
  password: string;
}
