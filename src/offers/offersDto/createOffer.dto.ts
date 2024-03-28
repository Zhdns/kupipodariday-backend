import { IsNumber } from 'class-validator';
import { LANGUAGE } from 'src/service/constants';
import { NUMBER_VALDATION_ERROR } from 'src/service/errors';

export class CreateOfferDto {
  @IsNumber({}, { message: NUMBER_VALDATION_ERROR(LANGUAGE.RU) })
  readonly amount: number;
  readonly hiden: number;
  readonly itemId: number;
  readonly user: number;
}
