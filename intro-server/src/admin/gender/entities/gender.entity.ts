import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum GenderSlug {
  WOMEN = 'women',
  MEN = 'men',
  TRANS = 'trans',
  BISEXUAL = 'bisexual',
  LESBIAN = 'lesbian',
  GAY = 'gay',
}
@Schema()
@ObjectType()
export class Gender extends mongoose.Document {
  @Prop({ type: String, required: true, lowercase: true })
  @Field()
  genderName: string;

  @Prop({ type: Number, required: true /*unique: true*/ })
  @Field()
  order: number;

  @Prop({ type: Boolean, required: true, default: false })
  @Field()
  isDeleted: boolean;

  //value gets saved in db
  @Prop({ type: String, enum: Object.values(GenderSlug), lowercase: true })
  @Field()
  slugName: string;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
