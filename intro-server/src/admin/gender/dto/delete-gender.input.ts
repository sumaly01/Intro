import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class DeleteGenderInput {
  @Field(() => ID)
  id: string;
  @Field()
  confirmDelete: boolean;
}
