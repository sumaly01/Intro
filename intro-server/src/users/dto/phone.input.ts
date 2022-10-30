import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PhoneInput {
  @Field(() => Number)
  phone_number: number;
}
