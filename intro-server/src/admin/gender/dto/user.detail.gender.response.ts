import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDetailGenderResponse {
  @Field(() => ID)
  id: string;
  @Field()
  genderName: string;
}
