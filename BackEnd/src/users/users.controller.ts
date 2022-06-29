import {Controller,Get,Post,Body,Patch, Param,Delete, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users : User[] = await this.usersService.findAll();
    console.log(users);
    return users;
  }

  @Get('/:name')
  async findOne(@Param('name') name: string, @Query('name1') name1: string) {
    const user : User = await this.usersService.findOne(name);
    return user;
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(id);
    console.log(updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:name')
  remove(@Param('name') id: string) {
    console.log(id);
    return this.usersService.remove(id);
  }

}
