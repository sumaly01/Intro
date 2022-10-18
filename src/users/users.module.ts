import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
// import { UserAuthModule } from './auth/user.auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './auth/strategy/user.jwt.strategy';
import { GenderModule } from 'src/admin/gender/gender.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      signOptions: { expiresIn: '30m' },
      secret: 'JWT_SECRET',
    }),
    GenderModule,
  ],
  providers: [UsersResolver, UsersService, UserJwtStrategy],
})
export class UsersModule {}
