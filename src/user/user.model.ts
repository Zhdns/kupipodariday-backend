import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Offers } from 'src/offers/offers.model';
import { DEFAULT_VALUE } from 'src/service/constants';
import { Wishes } from 'src/wishes/wishes.model';

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
  })
  about: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: DEFAULT_VALUE.AVATAR,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @HasMany(() => Wishes)
  wishes: Wishes[];

  @HasMany(() => Offers)
  offers: Offers[];
}
