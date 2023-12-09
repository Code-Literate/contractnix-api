import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/app/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      usernameField: 'email',
    });
  }

  async validate(payload: { id: string; email: string; fullName: string }) {
    return {
      _id: payload.id,
      email: payload.email,
      fullName: payload.fullName,
    };
  }
}
