import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateGenderInput } from './create-gender.input';

@InputType()
export class UpdateGenderInput extends PartialType(CreateGenderInput) {
  @Field(() => ID)
  _id: string;
}
