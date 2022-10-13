import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy /*, 'jwt'*/) {
  constructor(private adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //extracts jwt from auth header
      ignoreExpiration: false, //after expiry time it fails
      secretOrKey: 'JWT_SECRET',
    });
  }

  //token decode bhayesu validate call huncha
  //payload is decoded jwt
  public async validate(payload: any): Promise<any> {
    const admin = await this.adminService.findOne(payload.sub); //payload.sub gives id
    console.log('admin fetched after token validation', admin);
    return admin;
  }
}
