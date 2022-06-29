import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<userDocument>){}
  
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return await new this.userModel({ ...createUserDto }).save();
  }

  async findAll() : Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(name: string) : Promise<User> {
    return await this.userModel.findOne({name}).exec();
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({_id}, updateUserDto).exec();
  }

  async remove(_id: string) {
    return await this.userModel.findOneAndRemove({_id}).exec();
  }
}
