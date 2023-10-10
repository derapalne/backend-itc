import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt/dist';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      secretOrPrivateKey: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '600s' },
    }),
  ],
})
export class AuthModule {}
