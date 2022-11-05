import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateAdminDto {
  @Field(() => ID)
  _id: string;
  // @Field()
  // readonly name: string;
  @Field()
  readonly email: string;
}
