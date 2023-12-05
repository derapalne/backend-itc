import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserController } from 'src/controllers/user.controller';
import { UserSearchService } from 'src/services/userSearch.service';
import { UserSearch } from 'src/models/userSearch.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserSearch])],
  providers: [UserService, UserSearchService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
