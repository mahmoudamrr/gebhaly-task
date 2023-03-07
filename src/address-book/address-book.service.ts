import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressBookDto } from './dto/create-address-book.dto';
import { UpdateAddressBookDto } from './dto/update-address-book.dto';
import { User, UserDocument } from '../user/user.model';
import { AddressBook, AddressBookDocument } from './address-book.model';

@Injectable()
export class AddressBookService {
  constructor(
    @InjectModel(AddressBook.name)
    private userAddressModel: Model<AddressBookDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(
    createUserAddressDto: CreateAddressBookDto,
  ): Promise<AddressBook> {
    try {
      const createdUserAddress = new this.userAddressModel(createUserAddressDto);
      return createdUserAddress.save();
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async findAll(): Promise<AddressBook[]> {
    return this.userAddressModel.find().exec();
  }

  async findAllByUserId(userId: string): Promise<AddressBook[]> {
    try {
      const user = await this.userModel.findById(userId).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return this.userAddressModel.find({ user: userId }).exec();
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async findOne(id: string): Promise<AddressBook> {
    try {
      return this.userAddressModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  async update(
    id: string,
    updateUserAddressDto: UpdateAddressBookDto,
  ): Promise<AddressBook> {
    try {
      return this.userAddressModel
      .findByIdAndUpdate(id, updateUserAddressDto, { new: true })
      .exec();
    } catch(error) {
      throw new BadRequestException(`${error.message}`);

    }
  }

  async remove(id: string): Promise<AddressBook> {
    try {
      return this.userAddressModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }
}
