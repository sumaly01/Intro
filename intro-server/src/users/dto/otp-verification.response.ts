import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class OtpVerifyResponse {
  // @Field()
  // verifyOtp: boolean;

  @Field(() => ID)
  _id: string;

  @Field()
  access_token: string;
}
