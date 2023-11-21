import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { ProductModule } from './modules/product.module';
import { BrandModule } from './modules/brand.module';
import { Brand } from './models/brand.model';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { ConfigModule } from '@nestjs/config';
import { InitModule } from './modules/init.module';
import { InitController } from './controllers/init.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: '.db/data.sqlite3',
      database: 'itcrowd.backend',
      autoLoadModels: true,
      synchronize: true,
      models: [Product, Brand],
    }),
    ProductModule,
    BrandModule,
    AuthModule,
    UserModule,
    InitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
