import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/admin'),
            MongooseModule.forFeature([{name: User.name, schema:userSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
