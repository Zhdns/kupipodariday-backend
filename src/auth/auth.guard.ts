import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { LANGUAGE } from 'src/helpers/constants';
import { AUTH_ERROR } from 'src/helpers/errors';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const auth = req.headers.authorization;
      const bearer = auth.split(' ')[0];
      const token = auth.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ messege: AUTH_ERROR(LANGUAGE.RU) });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException({ messege: AUTH_ERROR(LANGUAGE.RU) });
    }
  }
}
