import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.model';

export type AddressBookDocument = AddressBook & Document;
@Schema()
export class AddressBook extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zip: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const AddressBookSchema = SchemaFactory.createForClass(AddressBook);
