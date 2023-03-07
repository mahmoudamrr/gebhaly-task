import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsEmail()
  state: string;

  @IsNotEmpty()
  @IsString()
  zip: string;
}
