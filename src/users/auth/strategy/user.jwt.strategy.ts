import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy /*, 'jwt'*/) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extracts jwt from auth header
      ignoreExpiration: false, //after expiry time it fails
      secretOrKey: 'JWT_SECRET',
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
