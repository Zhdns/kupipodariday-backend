import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { LANGUAGE } from 'src/service/constants';
import {
  EMAIL_VALIDATION_ERROR,
  LENGTH_VALIDATION_ERROR,
  STRING_VALDATION_ERROR,
  URL_VALIDATION_ERROR,
} from 'src/service/errors';

export class CreateUserDto {
  @IsString()
  @Length(2, 30, { message: LENGTH_VALIDATION_ERROR(2, 30, LANGUAGE.RU) })
  readonly username: string;

  @IsEmail({}, { message: EMAIL_VALIDATION_ERROR(LANGUAGE.RU) })
  readonly email: string;

  @IsString({ message: STRING_VALDATION_ERROR(LANGUAGE.RU) })
  readonly password: string;

  @IsOptional()
  @IsString({ message: STRING_VALDATION_ERROR(LANGUAGE.RU) })
  @Length(2, 200, { message: LENGTH_VALIDATION_ERROR(2, 200, LANGUAGE.RU) })
  readonly about: string;

  @IsOptional()
  @IsUrl({}, { message: URL_VALIDATION_ERROR(LANGUAGE.RU) })
  readonly avatar: string;
}
