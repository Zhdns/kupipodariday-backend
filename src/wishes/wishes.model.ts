import { isURL } from 'class-validator';
import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { LANGUAGE } from 'src/helpers/constants';
import {
  LENGTH_VALIDATION_ERROR,
  NUMBER_VALDATION_ERROR,
  STRING_VALDATION_ERROR,
  URL_VALIDATION_ERROR,
} from 'src/helpers/errors';
import { Offers } from 'src/offers/offers.model';
import { User } from 'src/user/user.model';
import { Wishlists } from 'src/wishlists/wishlists.model';
import { WishlistWishes } from 'src/wishlistsWishes/wishlistWishes.model';

interface WishesInterface {
  name: string;
  link: string;
  image: string;
  description: string;
  price: number;
  raised: number;
  copied: number;
  userId: number;
  offers: Offers[];
}

@Table({ tableName: 'wishes' })
export class Wishes extends Model<Wishes, WishesInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      url(value: string) {
        if (!isURL(value)) {
          throw new Error(URL_VALIDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  link: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      url(value: string) {
        if (!isURL(value)) {
          throw new Error(URL_VALIDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  image: string;

  @Column({
    type: DataType.STRING(1024),
    allowNull: false,
    validate: {
      len: {
        args: [2, 1024],
        msg: LENGTH_VALIDATION_ERROR(2, 200, LANGUAGE.RU),
      },
      string(value: any) {
        if (typeof value !== 'string') {
          throw new Error(STRING_VALDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      num(value: any) {
        if (typeof value !== 'number') {
          throw new Error(NUMBER_VALDATION_ERROR(LANGUAGE.RU));
        }
      },
    },
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  raised: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  copied: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => Offers)
  offers: Offers[];

  @BelongsToMany(() => Wishlists, () => WishlistWishes)
  wishlist: Wishlists[];
}
