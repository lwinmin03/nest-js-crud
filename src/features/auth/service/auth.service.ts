import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/features/user/service/user.service';
import { LoginUserDto } from '../dto/login.user.dto';
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,

    private userService:UserService
  ) {}



  async validateUser(

    LoginUserDto:LoginUserDto
  ):Promise<any>{

    const user=await this.userService.fineOne(LoginUserDto.email);

    if(!user) return null;

    if(await argon2.verify(user?.pwd,LoginUserDto.pwd)) {
      const {pwd,...result}=user;
      return result;
    }
    return null;

  }


  async getToken(userId: number, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: 'superkey', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: 'superkey', expiresIn: '7d' },
      ),
    ]);

    return { accessToken: at, refreshToken: rt };
  }



  
}
