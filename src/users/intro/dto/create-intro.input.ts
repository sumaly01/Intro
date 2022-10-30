import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateIntroInput {
  // @Field(() => ID)
  // createdBy: string;
  @Field()
  fileName: string;
}
