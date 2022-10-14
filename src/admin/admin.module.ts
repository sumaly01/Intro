import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminSchema } from './schemas/admin.schema';
import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
// import { GenderModule } from './gender/gender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }]),
    /*GenderModule,*/
  ],
  providers: [AdminResolver, AdminService],
  exports: [AdminService],
})
export class AdminModule {}
