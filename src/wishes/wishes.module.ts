import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WishController } from './wish.controller';
import { WishService } from './wish.service';
import { Wishes } from './wishes.model';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Offers } from 'src/offers/offers.model';
import { WishlistWishes } from 'src/wishlistsWishes/wishlistWishes.model';

@Module({
  controllers: [WishController],
  providers: [WishService],
  imports: [
    UserModule,
    AuthModule,
    SequelizeModule.forFeature([Wishes, User, Offers, WishlistWishes]),
  ],
  exports: [WishService],
})
export class WishesModule {}
