import { Field, ObjectType, ID } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';

// import { IsEmail } from 'class-validator';

@ObjectType()
export class CreateUserResponse {
  @Field(() => ID)
  id: string;
  @Field(() => GraphQLDate)
  birthday: GraphQLDate;
  @Field()
  name: string;
  @Field()
  gender: string;
  //   @Field()
  //   interestedIn: string;
  //   @Field()
  //   interests: string[];
  //   @Field()
  //   @IsEmail()
  //   email: string;
}
