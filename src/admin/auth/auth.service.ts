import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin.service';
import * as bcrypt from 'bcrypt';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(username: string, pass: string): Promise<any> {
  //     const user = await this.usersService.findOne(username);
  //     if (user && user.password === pass) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   }

  async login(adminLogin: Admin) {
    //for multiple admins
    const admin = await this.adminService.findByEmail(adminLogin.email);
    if (!admin) {
      throw new NotFoundException('Admin not found!');
    }
    const validPassword = await bcrypt.compare(
      adminLogin.password,
      admin.password,
    );
    if (!validPassword) {
      throw new NotFoundException('Enter correct password');
    }

    const payload = {
      adminEmail: admin.email,
      sub: admin.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin,
    };
  }
}
