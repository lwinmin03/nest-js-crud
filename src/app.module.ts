import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './features/user/entity/user.entity';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      username:'postgres',
      password:"yourpassword",
      host:'localhost',
      port:5432,
      database:'my_new_db',
      entities:[user],
      synchronize:true,
      
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
