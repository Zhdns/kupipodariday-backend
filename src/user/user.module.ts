import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Wishes } from 'src/wishes/wishes.model';
import { AuthModule } from 'src/auth/auth.module';
import { Offers } from 'src/offers/offers.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Wishes, Offers]),
  ],
  exports: [UserService],
})
export class UserModule {}
