import { Body, Controller, Post, InternalServerErrorException, Get, HttpException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { user } from '../entity/user.entity'; // Convention: Classes/Entities should be PascalCase
import * as argon2 from 'argon2';
import { type UserDto } from '../dto/request/user.dto';
import { log } from 'console';
import { UserResponse } from '../dto/response/user.response';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enum/user.role.enum';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}



  
  @Post('/create')
  @Roles(Role.SuperAdmin)
  async create(@Body() userDto:UserDto) {
        return this.userService.create(userDto)


  }



  @Get()
  async findAll():Promise <{users:UserResponse[]}>{
  const users=await this.userService.findAll()
  return {
    users:users

  }
  }
}