import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
constructor(
    @InjectRepository(user)
    private readonly userRepo:Repository<user>,
){}


create(user:UserDto):Promise<UserDto> {
    return this.userRepo.save(user)
}


fineOne(email:string):Promise <user | null>{
    return this.userRepo.findOne({where:{email:email}})
}


}
