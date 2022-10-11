import { Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AdminLoginResponse } from './dto/admin-login-response';
import { LoginAdminInput } from './dto/login-admin.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AdminLoginResponse)
  login(@Args('loginAdminInput') loginAdminInput: LoginAdminInput) {
    return this.authService.login(loginAdminInput);
  }
}
