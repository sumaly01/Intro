import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AdminModule } from '../admin.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { sendMail } from './utils/sendEmail';
import { ConfigService } from '@nestjs/config';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    signOptions: { expiresIn: '30m' },
    secret: configService.get<string>('ADMIN_JWT_SECRET'),
  }),
  inject: [ConfigService],
};

@Module({
  imports: [AdminModule, JwtModule.registerAsync(jwtFactory)],
  providers: [AuthService, AuthResolver, JwtStrategy, sendMail], //strategy in providers
})
// @Module({
//   imports: [
//     AdminModule,
//     JwtModule.register({
//       signOptions: { expiresIn: '30m' },
//       secret: configService.get<string>('ADMIN_JWT_SECRET'),
//     }),
//   ],
//   providers: [AuthService, AuthResolver, JwtStrategy, sendMail], //strategy in providers
// })
export class AuthModule {}
