import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AddressBookModule } from './address-book/address-book.module';
import { User, UserSchema } from './user/user.model';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    AddressBookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
