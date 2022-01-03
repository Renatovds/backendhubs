import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(login: string) {
    return await this.userModel.findOne({ login: login });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.remove({ _id: id }).exec();
  }
}
