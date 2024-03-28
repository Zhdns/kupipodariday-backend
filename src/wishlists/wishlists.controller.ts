import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistsDto } from './wishlistsDto/wishlists.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('/wishlistlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() wishlistsDto: CreateWishlistsDto, @Req() req: any) {
    console.log(wishlistsDto);
    const userId = req.user.id;
    return this.wishlistsService.createWishlist(wishlistsDto, userId);
  }

  @Get()
  getWishlists() {
    return this.wishlistsService.getWishlists();
  }

  @Get(':id')
  async getWishesByUsername(@Param('id') id: number) {
    const wishlist = await this.wishlistsService.getWishlistById(id);
    if (!wishlist) {
      throw new UnauthorizedException({ messege: 'User not Found' });
    }
    return wishlist;
  }
}
