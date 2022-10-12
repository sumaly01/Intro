import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
// const sgMail = require('@sendgrid/mail');

@Injectable()
export class sendMail {
  constructor(private config: ConfigService) {}

  async sendForgetPasswordMail(email: string, forgetPasswordToken: any) {
    const sendgridAPIKey = this.config.get<string>('MAIL_API_KEY');
    sgMail.setApiKey(sendgridAPIKey);
    try {
      await sgMail.send({
        to: email,
        from: 'sumalybajra@gmail.com',
        subject: 'Thanks for your request to reset password',
        html: `<h3>............RESET YOUR PASSWORD...............</h3>
        <div>
        <p>You can use the link below to reset </p>
        <button style="background:yellow">http://localhost:3000/user/reset-password/${forgetPasswordToken}</button>
        </div>
        `,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
