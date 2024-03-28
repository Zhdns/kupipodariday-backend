import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Wishes } from 'src/wishes/wishes.model';

interface OfferInterface {
  id: number;
  user: number;
  amount: number;
  hidden: boolean | null;
  itemId: number;
  name: string;
}

@Table({ tableName: 'offers' })
export class Offers extends Model<Offers, OfferInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  hidden: boolean | null;

  @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Wishes)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  itemId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user: number;

  @BelongsTo(() => User)
  owner: User;

  @BelongsTo(() => Wishes)
  item: Wishes;
}
