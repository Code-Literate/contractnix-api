import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from './interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(
      body.fullName,
      body.email,
      body.password
    );
  }

  // @Get('/:id')
  // async findOne(@Param('id') id: string) {
  //   return this.usersService.findOneById(id);
  // }

  @Post('/protected')
  @UseGuards(JwtAuthGuard)
  async protectedData(@Request() req) {
    return req.user;
  }
}
