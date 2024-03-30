import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishes } from './wishes.model';
import { CreateWishDto } from './wishesDto/createWish.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { Offers } from 'src/offers/offers.model';
import { FIND_PK } from 'src/helpers/utility';
import { ACCESS_ERROR, RAISED_ERROR } from 'src/helpers/errors';
import { LANGUAGE } from 'src/helpers/constants';

@Injectable()
export class WishService {
  constructor(
    private userService: UserService,
    @InjectModel(Wishes) private wishesRepository: typeof Wishes,
  ) {}

  async createWish(dto: CreateWishDto, userId: number) {
    const user = await this.userService.getUserByPK(userId);

    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }

    const wish = await this.wishesRepository.create({
      ...dto,
      userId: userId,
    });

    return wish;
  }
  async getLastTen() {
    const wishes = await this.wishesRepository.findAll({
      limit: 40,
      order: [['createdAt', 'DESC']],
    });
    if (!wishes) {
      throw new UnauthorizedException({ messege: 'NO WISHES' });
    }
    return wishes;
  }

  async getPopularGift() {
    const wishes = await this.wishesRepository.findAll({
      limit: 10,
      order: [['copied', 'DESC']],
    });
    if (!wishes) {
      throw new UnauthorizedException({ messege: 'NO WISHES' });
    }
    return wishes;
  }

  async getWishById(wishId: number) {
    const wish = await this.wishesRepository.findByPk(wishId, {
      include: [{ model: User }, { model: Offers }],
    });
    if (!wish) {
      throw new UnauthorizedException({ messege: 'Wish is not found' });
    }
    return wish;
  }

  async toRaise(raised: number, wishId: number) {
    const wish = await this.getWishById(wishId);
    const newRaised = wish.raised + raised;
    await this.wishesRepository.update(
      { raised: newRaised },
      {
        where: { id: wishId },
      },
    );
    return this.getWishById(wishId);
  }

  async toCopy(wishId: number) {
    const wish = await this.getWishById(wishId);
    const newCopyNumber = wish.copied + 1;
    await this.wishesRepository.update(
      { copied: newCopyNumber },
      {
        where: { id: wishId },
      },
    );
    return {
      name: wish.name,
      link: wish.link,
      image: wish.image,
      description: wish.description,
      price: wish.price,
    };
  }

  async deleteWishById(wishId: number) {
    const wish = await this.getWishById(wishId);
    if (!wish) {
      throw new UnauthorizedException({ message: 'Wish is not found' });
    }
    wish.destroy();
    return { message: 'Wish deleted successfully' };
  }

  async updateWish(wishId: number, newWish: CreateWishDto, userId: number) {
    const wish = await FIND_PK(this.wishesRepository, wishId);
    if (wish.userId !== userId) {
      throw new HttpException(ACCESS_ERROR(LANGUAGE.RU), HttpStatus.FORBIDDEN);
    }

    if (wish.raised > 0) {
      throw new HttpException(RAISED_ERROR(LANGUAGE.RU), HttpStatus.FORBIDDEN);
    }

    Object.assign(wish, newWish);
    await wish.save();
    return wish;
  }
}
