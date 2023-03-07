import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAddressBookDto } from './dto/create-address-book.dto';
import { UpdateAddressBookDto } from './dto/update-address-book.dto';
import { AddressBook } from './address-book.model';
import { AddressBookService } from './address-book.service';

@Controller(':userId/address-book')
export class AddressBookController {
  constructor(private readonly userAddressBookService: AddressBookService) {}

  @Get()
  async getAllUserAddresses(
    @Param('userId') userId: string,
  ): Promise<AddressBook[]> {
    return this.userAddressBookService.findAllByUserId(userId);
  }

  @Get(':addressId')
  async getUserAddressById(
    @Param('addressId') addressId: string,
  ): Promise<AddressBook> {
    return this.userAddressBookService.findOne(addressId);
  }

  @Post()
  async createUserAddress(
    @Param('userId') user: string,
    @Body() createUserAddressDto: CreateAddressBookDto,
  ): Promise<AddressBook> {
    return this.userAddressBookService.create({
      ...createUserAddressDto,
      user,
    });
  }

  @Put(':addressId')
  async updateUserAddress(
    @Param('addressId') addressId: string,
    @Body() updateUserAddressDto: UpdateAddressBookDto,
  ): Promise<AddressBook> {
    return this.userAddressBookService.update(addressId, updateUserAddressDto);
  }

  @Delete(':addressId')
  async deleteUserAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
  ): Promise<any> {
    return this.userAddressBookService.remove(addressId);
  }
}
