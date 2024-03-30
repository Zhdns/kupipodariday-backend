import { IsUrl, Length } from 'class-validator';
import { LANGUAGE } from 'src/helpers/constants';
import {
  LENGTH_VALIDATION_ERROR,
  URL_VALIDATION_ERROR,
} from 'src/helpers/errors';

export class CreateWishlistsDto {
  @Length(1, 250, { message: LENGTH_VALIDATION_ERROR(1, 250, LANGUAGE.RU) })
  readonly name: string;

  @IsUrl({}, { message: URL_VALIDATION_ERROR(LANGUAGE.RU) })
  readonly image: string;

  readonly itemsId: number[];
}
