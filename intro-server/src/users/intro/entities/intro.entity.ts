import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ObjectType, Field } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
@ObjectType()
export class Intro extends mongoose.Document {
  @Prop({ type: Boolean, default: false })
  @Field()
  isDeleted: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field()
  createdBy: User;

  @Prop({ type: Boolean, default: true })
  @Field()
  currentIntro: boolean;

  @Prop({ type: Date, default: Date.now() })
  @Field()
  createdAt: Date;

  @Prop({ type: String })
  @Field()
  filePath: string;

  @Prop({ type: String })
  @Field()
  fileName: string;

  @Prop({ type: String })
  @Field()
  fileDirectory: string;
}

export const IntroSchema = SchemaFactory.createForClass(Intro);
