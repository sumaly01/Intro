import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class Gender extends mongoose.Document {
  @Prop({ type: String, required: true, lowercase: true })
  @Field()
  genderName: string;

  // @Prop({ type: Number, required: true, unique: true })
  // @Field()
  // order: number;

  @Prop({ type: Boolean, required: true, default: false })
  @Field()
  isDeleted: boolean;
}

export const GenderSchema = SchemaFactory.createForClass(Gender);
