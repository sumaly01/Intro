import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IsEmail } from 'class-validator';
import mongoose from 'mongoose';
import { Gender } from 'src/admin/gender/entities/gender.entity';

@Schema()
@ObjectType()
export class User extends mongoose.Document {
  @Prop({ type: Number, required: true, trim: true, unique: true })
  @Field()
  phone_number: number;

  @Prop({ type: Date })
  @Field(() => GraphQLDate)
  birthday?: GraphQLDate;

  @Prop({ type: String })
  @Field()
  name?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gender' })
  @Field()
  gender?: Gender;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gender' })
  @Field()
  interestedIn?: Gender;

  @Prop({ type: [{ type: String }] })
  interests?: string[];

  @Prop({ type: String, trim: true })
  @Field()
  @IsEmail()
  email?: string;

  @Prop({ type: Number, required: true })
  @Field()
  otp: number;

  @Prop({ type: Date })
  @Field(() => GraphQLDate)
  expiry_time: GraphQLDate;

  @Prop({ type: Boolean })
  @Field()
  newUser: boolean;

  @Prop({ type: Boolean, default: false })
  @Field()
  verifyOtp?: boolean;

  @Prop({ type: String })
  @Field()
  access_token?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
