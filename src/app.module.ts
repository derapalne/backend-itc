import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { ProductModule } from './modules/product.module';
import { BrandModule } from './modules/brand.module';
import { Brand } from './models/brand.model';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
