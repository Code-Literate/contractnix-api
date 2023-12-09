import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findByEmail(email);

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(pass, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      return null;
    }
    delete user.password;
    return user;
  }

  async login(user: UserDocument) {
    const payload = {
      fullName: user.fullName,
      id: user._id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
