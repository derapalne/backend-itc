import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt/dist';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserService } from 'src/services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      secretOrPrivateKey: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '6000s' },
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, JwtStrategy],
})
export class AuthModule {}
