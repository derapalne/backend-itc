import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ where: { username: username } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    if (user.password !== user.matchingPassword)
      throw new Error("Passwords don't match");
    user.password = await bcrypt.hash(user.password, 15);
    return await this.userModel.create<User>(user as any);
  }
}
