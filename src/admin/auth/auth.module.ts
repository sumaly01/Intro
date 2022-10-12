import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AdminModule } from '../admin.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { sendMail } from './utils/sendEmail';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      signOptions: { expiresIn: '30m' },
      secret: 'JWT_SECRET',
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, sendMail], //strategy in providers
})
export class AuthModule {}
