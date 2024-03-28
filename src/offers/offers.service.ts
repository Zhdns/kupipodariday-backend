import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Offers } from './offers.model';
import { UserService } from 'src/user/user.service';
import { WishService } from 'src/wishes/wish.service';
import { CreateOfferDto } from './offersDto/createOffer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offers) private offersRepasitory: typeof Offers,
    private userService: UserService,
    private wishesService: WishService,
  ) {}

  async createOffer(dto: CreateOfferDto, userId: number, itemId: number) {
    const user = await this.userService.getUserByPK(userId);
    const item = await this.wishesService.getWishById(itemId);

    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    if (!item) {
      throw new UnauthorizedException({ message: 'Item not found' });
    }

    const offer = await this.offersRepasitory.create({
      ...dto,
      user: userId,
      itemId: itemId,
      name: user.username,
    });

    this.wishesService.toRaise(dto.amount, itemId);

    return offer;
  }
}
