import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wishlists } from './wishlists.model';
import { CreateWishlistsDto } from './wishlistsDto/wishlists.dto';
import { WishlistWishes } from 'src/wishlistsWishes/wishlistWishes.model';
import { Wishes } from 'src/wishes/wishes.model';
import { User } from 'src/user/user.model';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectModel(Wishlists) private wishlistsRepository: typeof Wishlists,
    // eslint-disable-next-line prettier/prettier
    @InjectModel(WishlistWishes) private wishlistWishesRepository: typeof WishlistWishes,
  ) {}

  async createWishlist(dto: CreateWishlistsDto, userid: number) {
    const wishlist = await this.wishlistsRepository.create({
      ...dto,
      ownerId: userid,
    });

    if (dto.itemsId && dto.itemsId.length > 0) {
      const wishlistWishesPromises = dto.itemsId.map((wishId) => {
        return this.wishlistWishesRepository.create({
          wishlistId: wishlist.id,
          wishId: wishId,
        });
      });
      await Promise.all(wishlistWishesPromises);
    }

    return wishlist;
  }

  async getWishlists() {
    const wishlists = await this.wishlistsRepository.findAll({
      limit: 10,
      include: [
        {
          model: Wishes,
        },
      ],
    });
    if (!wishlists) {
      throw new UnauthorizedException({ messege: 'NO WISHlists' });
    }

    return wishlists;
  }

  async getWishlistById(id: number) {
    const wishlist = await this.wishlistsRepository.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: Wishes,
        },
      ],
    });

    return wishlist;
  }
}
