import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/userDto/createUser.dto';
import { LoginUserDto } from 'src/user/userDto/loginUser.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signIn(@Body() userDto: LoginUserDto, @Res() res: any) {
    const result = await this.authService.singIn(userDto);
    res.json(result);
  }

  @Post('/signup')
  async signUp(@Body() userDto: CreateUserDto, @Res() res: any) {
    const result = await this.authService.signUp(userDto);
    res.json(result);
  }
}
