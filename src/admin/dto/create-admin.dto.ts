import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateAdminDto {
  @Field(() => ID)
  id: string;
  // @Field()
  // readonly name: string;
  @Field()
  readonly email: string;
}
