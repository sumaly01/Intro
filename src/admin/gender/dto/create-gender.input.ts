import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGenderInput {
  @Field(() => String)
  genderName: string;
}
