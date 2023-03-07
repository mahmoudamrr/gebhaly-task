import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  street?: string;

  @IsString()
  city?: string;

  @IsEmail()
  state?: string;

  @IsString()
  zip?: string;
}
