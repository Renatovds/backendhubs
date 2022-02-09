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
    if (createUserDto.password === '' || createUserDto.password === undefined) {
      return new Error('Uma senha deve ser definida.');
    }
    const userExist = await this.userModel.findOne({
      login: createUserDto.login,
    });
    if (userExist) {
      return new Error('Login já sendo utilizado.');
    }
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll() {
    const users = await this.userModel.find();
    if (users) {
      const filteredUsers = users.map((user) => {
        return {
          _id: user._id,
          name: user.name,
          login: user.login,
          user_type: user.user_type,
        };
      });
      return filteredUsers;
    }
    return null;
  }

  async findOneByID(id: string) {
    return await this.userModel.findOne({ _id: id });
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
