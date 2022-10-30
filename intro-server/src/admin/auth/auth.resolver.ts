import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AdminLoginResponse } from './dto/admin-login-response';
import { LoginAdminInput } from './dto/login-admin.input';
import { ForgetPasswordInput } from './dto/forget-password.input';
import { ForgetPasswordResponse } from './dto/forget-password-response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt.auth.guard';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ResetPasswordResponse } from './dto/reset-password.response';
import { CurrentAdmin } from './decorators/current-admin';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AdminLoginResponse)
  login(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return this.authService.login(loginAdminInput);
  }

  @Mutation(() => ForgetPasswordResponse, { name: 'ForgetPassword' })
  async forgetPassword(
    @Args('ForgetPasswordInput') forgetPasswordInput: ForgetPasswordInput,
  ) {
    return this.authService.forgetPassword(forgetPasswordInput);
  }

  @Mutation(() => ResetPasswordResponse, { name: 'ResetPassword' })
  @UseGuards(JwtAuthGuard)
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput,
    @CurrentAdmin() currentAdmin: any,
  ) {
    // console.log(currentAdmin);
    const response = await this.authService.resetPassword(
      currentAdmin.id,
      resetPasswordInput,
    );
    return {
      resetPassword: response,
    };
  }
}
