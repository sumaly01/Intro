// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { UserJwtStrategy } from './strategy/user.jwt.strategy';
// import { UserAuthResolver } from './user.auth.resolver';
// import { UserAuthService } from './user.auth.service';

// @Module({
//   imports: [
//     JwtModule.register({
//       signOptions: { expiresIn: '30m' },
//       secret: 'JWT_SECRET',
//     }),
//   ],
//   providers: [UserAuthResolver, UserAuthService, UserJwtStrategy],
//   exports: [UserAuthService],
// })
// export class UserAuthModule {}
