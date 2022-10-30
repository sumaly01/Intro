import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
// import { UserAuthModule } from './auth/user.auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './auth/strategy/user.jwt.strategy';
import { ConfigService } from '@nestjs/config';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    signOptions: { expiresIn: '60m' },
    secret: configService.get<string>('USER_JWT_SECRET'),
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync(jwtFactory),
    // forwardRef(() => GenderModule),
    // IntroModule,
  ],
  providers: [UsersResolver, UsersService, UserJwtStrategy], //strategy in providers
  exports: [UsersService], //ingender and intro
})
// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//     JwtModule.register({
//       signOptions: { expiresIn: '30m' },
//       secret: 'USER_JWT_SECRET',
//     }),
//     GenderModule,
//     IntroModule,
//   ],
//   providers: [UsersResolver, UsersService, UserJwtStrategy],
// })
export class UsersModule {}
