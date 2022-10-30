import { Module } from '@nestjs/common';
import { IntroService } from './intro.service';
import { IntroResolver } from './intro.resolver';
import { IntroSchema } from './entities/intro.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users.module';
import { GenderModule } from 'src/admin/gender/gender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Intro', schema: IntroSchema }]),
    UsersModule,
    GenderModule,
  ],
  providers: [IntroService, IntroResolver],
})
export class IntroModule {}
