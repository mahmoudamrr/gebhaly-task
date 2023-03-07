import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel({
        ...createUserDto,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return createdUser.save();
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new Error('User not found');
      }
  
      user.firstName = updateUserDto.firstName || user.firstName;
      user.lastName = updateUserDto.lastName || user.lastName;
      user.email = updateUserDto.email || user.email;
      user.updated_at = new Date();
  
      return user.save();
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.userModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }
}
