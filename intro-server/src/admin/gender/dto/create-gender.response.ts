import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { GenderSlug } from '../entities/gender.entity';

registerEnumType(GenderSlug, { name: 'GenderSlug' });
@ObjectType()
export class CreateGenderResponse {
  @Field(() => ID)
  id: string;
  @Field()
  genderName: string;
  @Field()
  isDeleted: boolean;
  @Field()
  order: number;
  @Field(() => GenderSlug)
  slugName: GenderSlug;
}
