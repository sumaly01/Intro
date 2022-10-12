import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgetPasswordInput {
  @IsEmail()
  @Field()
  email: string;
}
