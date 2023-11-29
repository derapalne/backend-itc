import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/models/user.model';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/models/product.model';
import { Brand } from 'src/models/brand.model';
import { literal } from 'sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findById(userId: number): Promise<User> {
    return await this.userModel.findOne({
      where: { id: userId },
      include: [{ model: Product, include: [Brand] }],
      attributes: {
        exclude: ['password'],
        include: [
          [
            literal(
              `(SELECT COUNT(p.id) FROM product AS p WHERE p.creator_user_id = ${userId})`,
            ),
            'n_products',
          ],
        ],
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ where: { username: username } });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    if (user.password !== user.matchingPassword)
      throw new Error("Passwords don't match");
    if (user.username === 'admin') user.isAdmin = true;
    user.password = await bcrypt.hash(user.password, 15);
    return await this.userModel.create<User>(user as any);
  }
}
