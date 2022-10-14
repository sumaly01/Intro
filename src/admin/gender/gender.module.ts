import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderResolver } from './gender.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GenderSchema } from './entities/gender.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gender', schema: GenderSchema }]),
  ],
  providers: [GenderResolver, GenderService],
})
export class GenderModule {}
