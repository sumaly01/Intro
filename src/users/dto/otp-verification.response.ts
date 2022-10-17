import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpVerifyResponse {
  @Field()
  otpVerify: boolean;
}
