import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './entity/user.entity';
import { UserService } from './service/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([user])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
