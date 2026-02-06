import { Body, Controller, Post, InternalServerErrorException, Get, HttpException, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { user } from '../entity/user.entity';
import * as argon2 from 'argon2';
import { type UserDto } from '../dto/request/user.dto';
import { UserResponse } from '../dto/response/user.response';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enum/user.role.enum';
import { RoleGuard } from 'src/features/auth/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';



@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}



  
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Post('/create')
  @Roles(Role.SuperAdmin)
  async create(@Body() userDto:UserDto) {
        return this.userService.create(userDto)


  }



  @Get()
  @UseGuards(AuthGuard('jwt'),RoleGuard)
  @Roles(Role.User)
  async findAll():Promise <{users:any}>{
  const users=await this.userService.findAll()
  return {
    users:users

  }
  }
}