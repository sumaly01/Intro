import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderResolver } from './gender.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GenderSchema } from './entities/gender.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gender', schema: GenderSchema }]),
    // forwardRef(() => UsersModule),
    UsersModule,
  ],
  providers: [GenderResolver, GenderService],
  exports: [GenderService], //userService //introService
})
export class GenderModule {}
