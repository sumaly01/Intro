import { Field, ObjectType } from '@nestjs/graphql';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@ObjectType()
export class AdminLoginResponse {
  @Field()
  access_token: string;
  @Field(() => CreateAdminDto)
  admin: CreateAdminDto;
}
