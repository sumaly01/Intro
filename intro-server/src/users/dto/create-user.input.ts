import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IsEmail } from 'class-validator';
import { InterestedGender } from '../entities/user.entity';

registerEnumType(InterestedGender, { name: 'InterestedGender' });

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
  @Field(() => InterestedGender)
  interestedIn: InterestedGender;
  @Field(() => [String])
  interests: string[];
  @Field()
  @IsEmail()
  email: string;
}
