import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin.service';
import * as bcrypt from 'bcrypt';
import { Admin } from '../entities/admin.entity';
import { ForgetPasswordInput } from './dto/forget-password.input';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sendMail } from './utils/sendEmail';
import { ResetPasswordInput } from './dto/reset-password.input';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private sendMail: sendMail,
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

    const access_token = await this.generateJwtToken(payload);

    return {
      access_token,
      admin,
    };
  }

  async forgetPassword(forgetPasswordInput: ForgetPasswordInput) {
    const admin = await this.adminService.findByEmail(
      forgetPasswordInput.email,
    );
    if (!admin) {
      throw new BadRequestException('Email not registered!');
    }

    // console.log(admin.id);
    const payload = {
      sub: admin.id,
      adminEmail: admin.email,
    };
    const forgetPasswordToken = await this.generateJwtToken(payload);
    const mailSend = await this.sendMail.sendForgetPasswordMail(
      admin.email,
      forgetPasswordToken,
    );
    return {
      token: forgetPasswordToken,
      mailSend,
    };
  }

  async resetPassword(adminId: string, resetPasswordInput: ResetPasswordInput) {
    if (resetPasswordInput.password !== resetPasswordInput.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const password = await this.adminService.hashPassword(
      resetPasswordInput.password,
    );
    const updatedPassword = await this.adminService.resetPassword(
      adminId,
      password,
    );
    return updatedPassword;
  }

  private async generateJwtToken(payload: any) {
    return await this.jwtService.sign(payload);
  }
}
