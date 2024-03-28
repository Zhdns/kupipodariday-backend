import { IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  readonly query: string;
}
