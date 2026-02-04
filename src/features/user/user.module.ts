import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([user])
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
