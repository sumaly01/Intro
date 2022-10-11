import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@InputType()
export class CreateAdminInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;

  // @Field()
  // name: string;
  @IsEmail()
  @Field()
  email: string;
  @Field()
  password: string;
}
