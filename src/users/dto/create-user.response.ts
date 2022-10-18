import { Field, ObjectType, ID } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { UserDetailGenderResponse } from 'src/admin/gender/dto/user.detail.gender.response';

// import { IsEmail } from 'class-validator';

@ObjectType()
export class CreateUserResponse {
  @Field(() => ID)
  id: string;
  @Field(() => GraphQLDate)
  birthday: GraphQLDate;
  @Field()
  name: string;
  // @Field(() => [String])
  // interests: string[];
  @Field(() => UserDetailGenderResponse)
  gender: UserDetailGenderResponse;
  //   @Field()
  //   interestedIn: string;
  //   @Field()
  //   interests: string[];
  //   @Field()
  //   @IsEmail()
  //   email: string;
}
