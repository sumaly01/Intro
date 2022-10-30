import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { GenderSlug } from '../entities/gender.entity';

registerEnumType(GenderSlug, { name: 'GenderSlug' });
@InputType()
export class CreateGenderInput {
  @Field(() => String)
  genderName: string;
  @Field(() => Number)
  order: number;
  @Field(() => GenderSlug)
  slugName: GenderSlug;
}
