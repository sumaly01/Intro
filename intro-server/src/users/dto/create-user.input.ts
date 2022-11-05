import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IsEmail } from 'class-validator';
import { InterestedGender, Interests } from '../entities/user.entity';

registerEnumType(InterestedGender, { name: 'InterestedGender' });
registerEnumType(Interests, { name: 'Interests' });
@InputType()
export class CreateUserInput {
  // @Field(() => Number)
  // phone_number: number;
  @Field(() => GraphQLDate)
  birthday: GraphQLDate;
  @Field()
  name: string;
  @Field()
  gender: string;
  @Field(() => InterestedGender)
  interestedIn: InterestedGender;
  @Field(() => [Interests])
  interests: Interests[];
  @Field()
  @IsEmail()
  email: string;
}
