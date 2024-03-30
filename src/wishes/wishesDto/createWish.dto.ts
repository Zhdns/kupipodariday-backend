import { IsNumber, IsString, IsUrl, Length } from 'class-validator';
import { LANGUAGE } from 'src/helpers/constants';
import {
  LENGTH_VALIDATION_ERROR,
  NUMBER_VALDATION_ERROR,
  STRING_VALDATION_ERROR,
  URL_VALIDATION_ERROR,
} from 'src/helpers/errors';

export class CreateWishDto {
  @Length(1, 250, { message: LENGTH_VALIDATION_ERROR(1, 250, LANGUAGE.RU) })
  readonly name: string;

  @IsString({ message: STRING_VALDATION_ERROR(LANGUAGE.RU) })
  @IsUrl({}, { message: URL_VALIDATION_ERROR(LANGUAGE.RU) })
  readonly link: string;

  @IsUrl({}, { message: URL_VALIDATION_ERROR(LANGUAGE.RU) })
  readonly image: string;

  @Length(1, 1024, { message: LENGTH_VALIDATION_ERROR(1, 1024, LANGUAGE.RU) })
  readonly description: string;

  @IsNumber({}, { message: NUMBER_VALDATION_ERROR(LANGUAGE.RU) })
  readonly price: number;
}
