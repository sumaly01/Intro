import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IsEmail } from 'class-validator';
@ObjectType()
export class User {
  @Field(() => Float)
  phone_number: number;
  @Field(() => GraphQLDate)
  birthday: GraphQLDate;
  @Field()
  name: string;
  @Field()
  gender: string;
  @Field()
  interestedIn: string;
  @Field()
  interests: string[];
  @Field()
  @IsEmail()
  email: string;
}
