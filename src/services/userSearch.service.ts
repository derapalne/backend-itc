import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserSearchDto } from 'src/dtos/userSearch.dto';
import { UserSearch } from 'src/models/userSearch.model';

@Injectable()
export class UserSearchService {
  constructor(
    @InjectModel(UserSearch) private userSearchModel: typeof UserSearch,
  ) {}

  async getAllSearchs(): Promise<UserSearch[]> {
    return await this.userSearchModel.findAll();
  }

  async getAllSearchsById(userId: number): Promise<UserSearch[]> {
    return await this.userSearchModel.findAll({ where: { user_id: userId } });
  }

  async getUserLastSearch(userId: number): Promise<UserSearch> {
    return await this.userSearchModel.findOne({
      where: { user_id: userId },
      order: [['id', 'DESC']],
      limit: 1,
    });
  }

  async createSearch(userSearchDto: CreateUserSearchDto): Promise<UserSearch> {
    return await this.userSearchModel.create(userSearchDto as any);
  }
}
