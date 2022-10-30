import { Field, ObjectType } from '@nestjs/graphql';
import { CreateUserResponse } from 'src/users/dto/create-user.response';

@ObjectType()
export class CreateIntroResponse {
  @Field(() => CreateUserResponse)
  createdBy: CreateUserResponse;
  @Field(() => String)
  filePath: string;
  @Field(() => Boolean)
  currentIntro: boolean;
  //intro
}
