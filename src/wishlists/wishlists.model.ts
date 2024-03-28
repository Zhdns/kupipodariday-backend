import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
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
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
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
