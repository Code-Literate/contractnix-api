import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  _id: number;

  @Expose()
  fullName: string;

  @Expose()
  email: string;
}
