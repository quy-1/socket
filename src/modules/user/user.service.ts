import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../database/schema/user.schema';
import { Model } from 'mongoose';
import { UserRepository } from '../../database/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) public userModel: Model<UserDocument>,
    public userRepository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  // async findAll() {
  //   return await this.userRepository.pagination({});
  // }

  async findOne(where) {
    return this.userModel.findOne(where);
  }

  async update(_id: string, updateUserDto: any) {
    return this.userModel.findOneAndUpdate(
      {
        _id,
      },
      updateUserDto,
      { returnDocument: 'after' },
    );
  }

  async updateBySocketId(socketId: string, updateUserDto: any) {
    return this.userModel.findOneAndUpdate(
      {
        socketId,
      },
      updateUserDto,
      { returnDocument: 'after' },
    );
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

}
