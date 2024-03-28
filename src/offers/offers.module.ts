import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { UserModule } from 'src/user/user.module';
import { WishesModule } from 'src/wishes/wishes.module';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wishes } from 'src/wishes/wishes.model';
import { User } from 'src/user/user.model';
import { Offers } from './offers.model';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [
    UserModule,
    WishesModule,
    AuthModule,
    SequelizeModule.forFeature([Wishes, User, Offers]),
  ],
})
export class OfferModule {}
