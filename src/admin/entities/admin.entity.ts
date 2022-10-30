import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class Admin {
  @IsEmail()
  @Field()
  email: string;
  @Field()
  password: string;
  // @Field()
  // signedIn: boolean;
}
