import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { Product } from 'src/product/product.model';
import { Brand } from 'src/brand/brand.model';
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
    user.last_login = new Date(Date.now());
    return await this.userModel.create<User>(user as any);
  }

  async updateLastLogin(userId: number): Promise<[affectedCount: number]> {
    try {
      const user = await this.userModel.findByPk(userId);
      if (!user) throw new Error('User not found');
      return await this.userModel.update(
        { last_login: Date.now() },
        { where: { id: userId } },
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
