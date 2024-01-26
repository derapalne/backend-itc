import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product/product.model';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { Brand } from './brand/brand.model';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { InitModule } from './init/init.module';
import { UploadModule } from './upload/upload.module';
import { User } from './user/user.model';
import { UserSearch } from './user/search/userSearch.model';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { Cart } from './cart/cart.model';
import { CartProduct } from './cart/product/cartProduct.model';
import { CartModule } from './cart/cart.module';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.model';
import { ProductTag } from './product/tag/productTag.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: '.db/data.sqlite3',
      database: 'itcrowd.backend',
      autoLoadModels: true,
      synchronize: true,
      models: [
        Product,
        Brand,
        User,
        UserSearch,
        Cart,
        CartProduct,
        Tag,
        ProductTag,
      ],
    }),
    JwtModule.register({ secret: process.env['JWT_SECRET'] }),
    ProductModule,
    CartModule,
    BrandModule,
    AuthModule,
    UserModule,
    InitModule,
    UploadModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/');
  }
}
