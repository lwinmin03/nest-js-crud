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


async create(user:UserDto):Promise<UserResponse> {

    const exist=await this.userRepo.findOne({where:{email:user.email}});

    if(exist) {
    throw new ConflictException()
    }


    const hashPwd=await argon2.hash(user.pwd,{type:argon2.argon2id})
    const newUser={
        ...user,
        hashPwd
    }

     return this.userRepo.save(newUser) 
    
     
}


async fineOne(email:string):Promise <user | null>{
    return await this.userRepo.findOne({where:{email:email}})
}


findAll():Promise <UserResponse[]>{
const users=  this.userRepo.find({select:['id','email','role','provider']})

 return users;

}


}
