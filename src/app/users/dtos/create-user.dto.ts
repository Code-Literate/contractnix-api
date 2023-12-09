import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  password: string;
}
