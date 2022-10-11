import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@Schema()
export class User {
  @Prop({ type: Number, required: true })
  phone_number: number;
  @Prop({ type: Date, required: true })
  birthday: Date;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  interestedIn: string;
  @Prop({ type: [String], required: true })
  interests: string[];
  @Prop({ required: true })
  @IsEmail()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
