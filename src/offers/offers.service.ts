import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Offers } from './offers.model';
import { UserService } from 'src/user/user.service';
import { WishService } from 'src/wishes/wish.service';
import { CreateOfferDto } from './offersDto/createOffer.dto';
import { OFFER_ERROR, WISH_BELONGING_ERROR } from 'src/helpers/errors';
import { LANGUAGE } from 'src/helpers/constants';
import { FIND_PK } from 'src/helpers/utility';

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

    if (item.userId === userId) {
      throw new UnauthorizedException({
        message: WISH_BELONGING_ERROR(LANGUAGE.RU),
      });
    }

    // eslint-disable-next-line prettier/prettier
    if (dto.amount > (item.price - item.raised)) {
      throw new UnauthorizedException({
        message: OFFER_ERROR(LANGUAGE.RU),
      });
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

  async getAllOffers() {
    const offers = await this.offersRepasitory.findAll();
    return offers;
  }

  async getOfferByPK(id: number) {
    const offer = await FIND_PK(this.offersRepasitory, id);
    return offer;
  }
}
