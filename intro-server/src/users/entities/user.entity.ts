import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLDate } from 'graphql-iso-date';
import { IsEmail } from 'class-validator';
import mongoose from 'mongoose';
import { Gender } from 'src/admin/gender/entities/gender.entity';

export enum InterestedGender {
  WOMEN = 'women',
  MEN = 'men',
  TRANS = 'trans',
  BISEXUAL = 'bisexual',
  LESBIAN = 'lesbian',
  GAY = 'gay',
  EVERYONE = 'everyone',
}

export enum Interests {
  DANCE = 'dance',
  SING = 'sing',
  MUSIC = 'music',
  HIKE = 'hike',
  TRAVEL = 'travel',
  COOK = 'cook',
  READ_BOOKS = 'read books',
  SKETCH = 'sketch',
  CYCLING = 'cycling',
}
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

  @Prop({
    type: String,
    enum: Object.values(InterestedGender),
    lowercase: true,
  })
  @Field()
  interestedIn?: string;

  // @Prop({ type: [{ type: String, lowercase: true }] })
  // interests?: string[];

  @Prop({
    type: [{ type: String, enum: Object.values(Interests), lowercase: true }],
  })
  interests?: string[];

  @Prop({ type: String, trim: true, unique: true })
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
