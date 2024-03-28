import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { CreateOfferDto } from './offersDto/createOffer.dto';

@Controller('/offers')
export class OffersController {
  constructor(private offerService: OffersService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() offersDto: CreateOfferDto, @Req() req: any) {
    const userId = req.user.id;
    const wishId = offersDto.itemId;
    return this.offerService.createOffer(offersDto, userId, wishId);
  }
}
