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
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  link: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;

  @Column({
    type: DataType.STRING(1024),
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
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
