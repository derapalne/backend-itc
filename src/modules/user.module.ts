import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
