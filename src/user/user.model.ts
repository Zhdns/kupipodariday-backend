import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Offers } from 'src/offers/offers.model';
import { DEFAULT_VALUE, LANGUAGE } from 'src/helpers/constants';
import {
  EMAIL_VALIDATION_ERROR,
  LENGTH_VALIDATION_ERROR,
  STRING_VALDATION_ERROR,
  URL_VALIDATION_ERROR,
} from 'src/helpers/errors';
import { Wishes } from 'src/wishes/wishes.model';
import { isURL, isEmail } from 'validator';

interface UserInterface {
  username: string;
  email: string;
  password: string;
  about: string;
  avatar: string;
  wishes: Wishes[];
  offers: Offers[];
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [2, 30],
        msg: LENGTH_VALIDATION_ERROR(2, 30, LANGUAGE.RU),
      },
    },
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: DEFAULT_VALUE.ABOUT,
    validate: {
      len: {
        args: [2, 200],
        msg: LENGTH_VALIDATION_ERROR(2, 200, LANGUAGE.RU),
      },
      string(value: any) {
        if (typeof value !== 'string') {
          throw new Error(STRING_VALDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  about: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: DEFAULT_VALUE.AVATAR,
    validate: {
      url(value: string) {
        if (!isURL(value)) {
          throw new Error(URL_VALIDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      email(value: string) {
        if (!isEmail(value)) {
          throw new Error(EMAIL_VALIDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  email: string;

  @HasMany(() => Wishes)
  wishes: Wishes[];

  @HasMany(() => Offers)
  offers: Offers[];
}
