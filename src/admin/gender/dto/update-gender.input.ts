import { CreateGenderInput } from './create-gender.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGenderInput extends PartialType(CreateGenderInput) {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  genderName: string;
}
