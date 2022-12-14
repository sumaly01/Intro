import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { GenderSlug } from '../entities/gender.entity';

registerEnumType(GenderSlug, { name: 'GenderSlug' });
@InputType()
export class CreateGenderInput {
  @Field(() => String)
  genderName: string;
  @Field(() => GenderSlug)
  slugName: GenderSlug;
  @Field(() => Number)
  order: number;
}
