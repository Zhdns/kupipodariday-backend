import { UserModule } from 'src/user/user.module';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { AuthModule } from 'src/auth/auth.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishes } from 'src/wishes/wishes.model';
import { User } from 'src/user/user.model';
import { Module } from '@nestjs/common';
import { WishlistWishes } from 'src/wishlistsWishes/wishlistWishes.model';
import { Wishlists } from './wishlists.model';

@Module({
  controllers: [WishlistsController],
  providers: [WishlistsService],
  imports: [
    UserModule,
    AuthModule,
    WishesModule,
    SequelizeModule.forFeature([Wishes, User, WishlistWishes, Wishlists]),
  ],
})
export class WishlistsModule {}
