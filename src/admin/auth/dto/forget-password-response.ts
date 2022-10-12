import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ForgetPasswordResponse {
  @Field(() => String)
  token: string;
  @Field(() => Boolean)
  mailSend: boolean;
}
