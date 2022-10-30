import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @Field()
  confirmPassword: string;
}
