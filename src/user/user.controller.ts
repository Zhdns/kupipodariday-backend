import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './userDto/createUser.dto';
import { FOREIGN_USER_SCHEMA, REQUEST_ID } from 'src/service/utility';
import { ValidationPipe } from 'src/service/validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';
import { FindUserDto } from './userDto/findUser.dro';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return this.userService.createUser(userDto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getOwnUser(@Req() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me/wishes')
  getOwnWishes(@Req() req: any) {
    const userId = req.user.id;
    return this.userService.getUserWishes(userId);
  }

  @Get(':username')
  getUserByName(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Get(':username/wishes')
  async getWishesByUsername(@Param('username') username: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException({ messege: 'User not Found' });
    }
    return user.wishes;
  }

  @Post('/find')
  async findUser(@Body() payload: FindUserDto) {
    console.log(payload);
    let user = await this.userService.getUserByUsername(payload.query);
    console.log(user);
    if (!user) {
      console.log(`Trying to find by email: ${payload.query}`);
      user = await this.userService.getUserByEmail(payload.query);
      if (!user) {
        throw new UnauthorizedException({ message: 'User not found' });
      }
    }
    return FOREIGN_USER_SCHEMA(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateUser(@Body() userDto: CreateUserDto, @Req() req: any) {
    const user = this.userService.updateUser(REQUEST_ID(req), userDto);
    return user;
  }
}
