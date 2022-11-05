import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class DeleteGenderInput {
  @Field(() => ID)
  _id: string;
  // @Field()
  // confirmDelete: boolean;
}
