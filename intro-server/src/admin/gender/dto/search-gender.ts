import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { GenderSlug } from '../entities/gender.entity';

registerEnumType(GenderSlug, { name: 'GenderSlug' });
@InputType()
export class SearchGenderSlugInput {
  @Field(() => GenderSlug)
  slugName: GenderSlug;
}
