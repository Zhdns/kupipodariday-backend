import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './userDto/createUser.dto';
import { Wishes } from 'src/wishes/wishes.model';
import { FIND_ONE, FIND_PK } from 'src/helpers/utility';
import { UpdateUserDto } from './userDto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getUserByUsername(username: string) {
    const user = FIND_ONE(this.userRepository, { username }, Wishes);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = FIND_ONE(this.userRepository, { email }, Wishes);
    return user;
  }

  async getUserByPK(id: number) {
    const user = await FIND_PK(this.userRepository, id);
    console.log(`payload: ${id}, user: ${user}`);
    return user;
  }

  async getUserWishes(userId: number) {
    const user = await FIND_PK(this.userRepository, userId, Wishes);
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }
    return user.wishes;
  }

  async updateUser(userId: number, userDto: UpdateUserDto) {
    const user = await FIND_PK(this.userRepository, userId);
    Object.assign(user, userDto);
    await user.save();
    return user;
  }

  async deleteUserById(userId: number) {
    const user = this.getUserByPK(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    (await user).destroy();
    return { message: 'User deleted successfully' };
  }
}
