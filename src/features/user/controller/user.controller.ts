import { Body, Controller, Post, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { user } from '../entity/user.entity'; // Convention: Classes/Entities should be PascalCase
import * as argon2 from 'argon2';
import { type UserDto } from '../dto/user.dto';
import { log } from 'console';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async create(@Body() userDto:UserDto) {




    try {
    const existUser=await this.userService.fineOne(userDto.email);


    if(existUser) return "User Exists"

        





      const hashedPassword = await argon2.hash(userDto.pwd, {
        type: argon2.argon2id,

      });


      console.log(hashedPassword);
      


      const userToSave = {
        ...userDto,
        password: hashedPassword,
      };

 
      return await this.userService.create(userToSave);
    } catch (error) {
      throw new InternalServerErrorException('Could not create user');
    }
  }
}