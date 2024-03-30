import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/userDto/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/user/userDto/loginUser.dto';
import { SIGNIN_ERROR, USER_EXIST_ERROR } from 'src/helpers/errors';
import { LANGUAGE } from 'src/helpers/constants';
import { JwtAuthGuard } from './jwtAuth.guard';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      userName: user.username,
      about: user.about,
      avatar: user.avatar,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validation(userDto: LoginUserDto) {
    const user = await this.userService.getUserByUsername(userDto.username);
    console.log(user);
    if (!user) {
      throw new HttpException(SIGNIN_ERROR(LANGUAGE.RU), HttpStatus.NOT_FOUND);
    }
    const hashPass = await bcrypt.compare(userDto.password, user.password);
    console.log(hashPass);
    if (user && hashPass) {
      return user;
    }
    throw new HttpException(SIGNIN_ERROR(LANGUAGE.RU), HttpStatus.NOT_FOUND);
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByUsername(
      userDto.username,
    );
    if (candidate) {
      console.log(`User :  ${userDto} `);
      throw new HttpException(
        USER_EXIST_ERROR(LANGUAGE.RU),
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPass = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });
    const access_token = await this.generateToken(user);
    console.log({
      name: user.username,
      email: user.email,
      about: user.about,
      avatar: user.avatar,
      access_token,
    });
    return {
      name: user.username,
      email: user.email,
      about: user.about,
      avatar: user.avatar,
      access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  async singIn(userDto: LoginUserDto) {
    console.log(userDto);
    const user = await this.validation(userDto);
    return this.generateToken(user);
  }
}
