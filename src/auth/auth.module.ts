import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.KEY || 'qwerty',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    PassportModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
