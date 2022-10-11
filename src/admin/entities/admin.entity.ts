import { ObjectType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class Admin {
  @Field()
  @IsEmail() //not working
  email: string;
  @Field()
  password: string;
  // @Field()
  // signedIn: boolean;
}
