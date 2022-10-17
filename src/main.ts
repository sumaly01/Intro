import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { DateFormatInterceptor, DateFormat } from 'utilities/lib/date';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(
  //   new DateFormatInterceptor({ maxDeep: 6, format: DateFormat.toISOString }),
  // );
  await app.listen(3000);
}
bootstrap();
