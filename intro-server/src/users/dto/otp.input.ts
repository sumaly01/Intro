import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class OtpInput {
  @Field(() => Number)
  otp: number;
  @Field(() => Number)
  phone_number: number;
}
