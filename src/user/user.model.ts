import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { AddressBook } from 'src/address-book/address-book.model';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({unique: true})
  phone: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddressBook' }],
  })
  addressBooks: AddressBook[];

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
