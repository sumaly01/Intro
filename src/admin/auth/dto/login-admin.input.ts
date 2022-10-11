import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class LoginAdminInput {
  @IsEmail()
  @Field()
  email: string;
  @Field()
  password: string;
}
