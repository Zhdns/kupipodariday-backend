import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Wishes } from 'src/wishes/wishes.model';
import { Wishlists } from 'src/wishlists/wishlists.model';

@Table({ tableName: 'wishlistWihses', createdAt: false, updatedAt: false })
export class WishlistWishes extends Model<WishlistWishes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Wishlists)
  @Column({
    type: DataType.INTEGER,
  })
  wishlistId: number;

  @ForeignKey(() => Wishes)
  @Column({
    type: DataType.INTEGER,
  })
  wishId: number;
}
