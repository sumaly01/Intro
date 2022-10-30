import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(private jwtService: JwtService) {}

  // async generateUserToken(payload: any) {
  //   return this.jwtService.sign(payload);
  // }
}
