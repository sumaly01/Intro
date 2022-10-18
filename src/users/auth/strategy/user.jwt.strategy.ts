import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'jwtUser') {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extracts jwt from auth header
      ignoreExpiration: false, //after expiry time it fails
      secretOrKey: configService.get<string>('USER_JWT_SECRET'),
    });
  }

  //token decode bhayesu validate call huncha
  //payload is decoded jwt
  public async validate(payload: any): Promise<any> {
    const user = await this.usersService.findUserById(payload.sub); //payload.sub gives id
    console.log('user fetched after token validation', user);
    return user;
  }
}
