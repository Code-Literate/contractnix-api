import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findOne(email: string, password: string): Promise<User | undefined> {
    return this.userModel.findOne({ email, password });
  }

  async findByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }

  async createUser(
    fullName: string,
    email: string,
    password: string
  ): Promise<User | undefined> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userModel.create({
      fullName,
      email,
      password: result,
    });

    return user.save();
  }
}
