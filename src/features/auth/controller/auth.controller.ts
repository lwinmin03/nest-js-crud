import { Body, Controller, Post, Res, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dto/login.user.dto';
import { AuthService } from '../service/auth.service';
import { user } from 'src/features/user/entity/user.entity';
import {type Response } from 'express';
import { log } from 'console';

@Controller('auth')
export class AuthController {
constructor(private readonly authServie:AuthService){}


@Post('/login')
async login(@Body()dto:LoginUserDto,@Res({passthrough:true})res:Response){

    const user:user=await this.authServie.validateUser(dto);

    console.log(user);
    
    if(!user) throw new UnauthorizedException('Invalid Credentials');

    const {accessToken}=await this.authServie.getToken(user?.id,user?.email,user?.role)


 
    res.cookie('access_token', accessToken, {
      httpOnly: true,  
      secure: false,
      sameSite: 'strict', 
      maxAge: 1000 * 60 * 30, 
      path: '/',
      signed:true
    });

    return {message:"success login"}


}



}
