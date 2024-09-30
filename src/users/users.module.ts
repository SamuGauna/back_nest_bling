import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UsersService],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
