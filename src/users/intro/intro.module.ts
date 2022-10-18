import { Module } from '@nestjs/common';
import { IntroService } from './intro.service';
import { IntroResolver } from './intro.resolver';

@Module({
  providers: [IntroService, IntroResolver]
})
export class IntroModule {}
