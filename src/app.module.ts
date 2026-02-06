import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './features/user/entity/user.entity';
import { UserModule } from './features/user/user.module';
import { Idea } from './features/idea/entity/idea.entity';
import { IdeaModule } from './features/idea/idea.module';
import { AuthModule } from './features/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      username:'postgres',
      password:"yourpassword",
      host:'localhost',
      port:5432,
      database:'MY_NEW_DB',
      entities:[user,Idea],
      synchronize:true,
      
    }),
    UserModule,
    IdeaModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
