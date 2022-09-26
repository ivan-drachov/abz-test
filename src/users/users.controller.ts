import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  getMyUser(@Param() params: { id: number }, @Req() req) {
    return this.usersService.getMyUser(params.id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param() params: {id: number}, @Req() req){
    return this.usersService.getUserById(params.id, req)
  }

  //@Get('page/:page')
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  //getUsers(@Param() params: {page: number}) {
   // return this.usersService.getUsers(6,(params.page-1) * 6);
  }
}
