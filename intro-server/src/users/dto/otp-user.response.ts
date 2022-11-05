import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class OtpUserResponse {
  @Field(() => ID)
  _id: string;

  @Field()
  otp: number;

  @Field()
  phone_number: number;

  @Field()
  newUser: boolean;
}
