import { IsString } from 'class-validator';
import { LANGUAGE } from 'src/helpers/constants';
import { STRING_VALDATION_ERROR } from 'src/helpers/errors';

export class LoginUserDto {
  @IsString({ message: STRING_VALDATION_ERROR(LANGUAGE.RU) })
  readonly username: string;

  @IsString({ message: STRING_VALDATION_ERROR(LANGUAGE.RU) })
  readonly password: string;
}
