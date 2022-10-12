import { Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AdminLoginResponse } from './dto/admin-login-response';
import { LoginAdminInput } from './dto/login-admin.input';
import { ForgetPasswordInput } from './dto/forget-password.input';
import { ForgetPasswordResponse } from './dto/forget-password-response';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AdminLoginResponse)
  login(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return this.authService.login(loginAdminInput);
  }

  @Query(() => ForgetPasswordResponse, { name: 'ForgetPassword' })
  async forgetPassword(
    @Args('ForgetPasswordInput') forgetPasswordInput: ForgetPasswordInput,
  ) {
    return this.authService.forgetPassword(forgetPasswordInput);
  }
}
