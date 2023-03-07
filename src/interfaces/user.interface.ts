import { Address } from './address.interface';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressBooks: Address[];
  createdAt?: Date;
  updatedAt?: Date;
}
