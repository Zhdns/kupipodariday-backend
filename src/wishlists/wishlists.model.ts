import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import { LANGUAGE } from 'src/helpers/constants';
import { LENGTH_VALIDATION_ERROR } from 'src/helpers/errors';
import { User } from 'src/user/user.model';
import { Wishes } from 'src/wishes/wishes.model';
import { WishlistWishes } from 'src/wishlistsWishes/wishlistWishes.model';

interface WishlistsInterface {
  name: string;
  image: string;
  ownerId: number;
  owner: number;
  wishes: Wishes[];
  itemsId: number[];
}

@Table({ tableName: 'wishlists' })
export class Wishlists extends Model<Wishlists, WishlistsInterface> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 200],
        msg: LENGTH_VALIDATION_ERROR(2, 200, LANGUAGE.RU),
      },
    },
  })
  image: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  ownerId: number;

  @BelongsToMany(() => Wishes, () => WishlistWishes)
  items: Wishes[];

  @BelongsTo(() => User)
  owner: User;
}
