import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { WishService } from './wish.service';
import { CreateWishDto } from './wishesDto/createWish.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@Controller('/wishes')
export class WishController {
  constructor(private wishService: WishService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() wishesDto: CreateWishDto, @Req() req: any) {
    const userId = req.user.id;
    return this.wishService.createWish(wishesDto, userId);
  }

  @Get('/last')
  getLatTen() {
    return this.wishService.getLastTen();
  }

  @Get('/top')
  getTopTen() {
    return this.wishService.getPopularGift();
  }

  @Get(':id')
  getOwnWish(@Param('id') id: number) {
    return this.wishService.getWishById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  async copyWish(@Param('id') id: number, @Req() req: any) {
    console.log(id);
    const wishCopy = await this.wishService.toCopy(id);
    const userId = req.user.id;
    const newWish = await this.wishService.createWish(wishCopy, userId);
    console.log(newWish);
    return newWish;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async dleteWish(@Param('id') id: number, @Req() req: any) {
    const wish = await this.wishService.getWishById(id);
    if (wish.userId !== req.user.id) {
      throw new UnauthorizedException({ message: 'Wish not found' });
    }
    return await this.wishService.deleteWishById(id);
  }
}
