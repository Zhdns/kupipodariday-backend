import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { UserModule } from './user/user.module';
import { WishesModule } from './wishes/wishes.module';
import { Wishes } from './wishes/wishes.model';
import { AuthModule } from './auth/auth.module';
import { OfferModule } from './offers/offers.module';
import { Offers } from './offers/offers.model';
import { WishlistWishes } from './wishlistsWishes/wishlistWishes.model';
import { Wishlists } from './wishlists/wishlists.model';
import { WishlistsModule } from './wishlists/wishlists.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Wishes, Offers, WishlistWishes, Wishlists],
      autoLoadModels: true,
    }),
    UserModule,
    WishesModule,
    AuthModule,
    OfferModule,
    WishlistsModule,
  ],
})
export class AppModule {}
