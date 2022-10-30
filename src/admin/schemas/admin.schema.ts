import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema()
export class Admin {
  // @Prop({ required: true })
  // name: string;

  @IsEmail() //not working
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ required: true })
  // signedIn: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
