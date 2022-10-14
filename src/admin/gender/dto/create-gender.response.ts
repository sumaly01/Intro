import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateGenderResponse {
  @Field(() => ID)
  id: string;
  @Field()
  genderName: string;
  @Field()
  isDeleted: boolean;
}
