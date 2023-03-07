import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressBookDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  state: string;
  @IsNotEmpty()
  @IsString()
  zip: string;
}
