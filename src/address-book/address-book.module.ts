import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AddressBookSchema } from './address-book.model';
import { AddressBookService } from './address-book.service';
import { AddressBookController } from './address-book.controller';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AddressBook', schema: AddressBookSchema },
      { name: User.name, schema: UserSchema },
    ]),
    // UserModule,
  ],
  providers: [AddressBookService],
  controllers: [AddressBookController],
  exports: [MongooseModule],
})
export class AddressBookModule {}
