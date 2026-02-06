import { ConflictException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../entity/user.entity';
import { UserDto } from '../dto/request/user.dto';
import { UserResponse } from '../dto/response/user.response';
import * as argon2 from 'argon2';


@Injectable()
export class UserService {
constructor(
    @InjectRepository(user)
    private readonly userRepo:Repository<user>,
){}


async create(dto: UserDto): Promise<any> {
    
    const exist = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exist) {
        throw new ConflictException('Email already exists');
    }

  
    const hashPwd = await argon2.hash(dto.pwd, { type: argon2.argon2id });

    const newUser:UserDto = this.userRepo.create({
        email: dto.email,
        pwd: hashPwd, 
        role: dto.role,


        
        
    });

    
    return await this.userRepo.save(newUser);
}


async fineOne(email:string):Promise <any>{
    return await this.userRepo.findOne({where:{email:email}})
}


findAll():Promise <any[]>{
const users=  this.userRepo.find({select:['id','email','role','provider','pwd']})

 return users;

}


}
