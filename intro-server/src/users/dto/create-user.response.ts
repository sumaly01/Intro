import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { UserDetailGenderResponse } from 'src/admin/gender/dto/user.detail.gender.response';
import { InterestedGender } from '../entities/user.entity';

registerEnumType(InterestedGender, { name: 'InterestedGender' });

@ObjectType()
export class CreateUserResponse {
  @Field(() => ID)
  _id: string; //_ added
  @Field(() => String)
  name: string;
  @Field(() => UserDetailGenderResponse)
  gender: UserDetailGenderResponse;
  @Field(() => InterestedGender)
  interestedIn: InterestedGender;
  //intro
}
