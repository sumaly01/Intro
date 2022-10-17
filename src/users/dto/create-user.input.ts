import { InputType, Field } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => Number)
  phone_number: number;
  @Field(() => GraphQLDate)
  birthday: GraphQLDate;
  @Field()
  name: string;
  @Field()
  gender: string;
  @Field()
  interestedIn: string;
  @Field(() => [String])
  interests: string[];
  @Field()
  @IsEmail()
  email: string;
}
