import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserResponse } from './dto/create-user.response';
import { PhoneInput } from './dto/phone.input';
import { OtpUserResponse } from './dto/otp-user.response';
import { OtpVerifyResponse } from './dto/otp-verification.response';
import { OtpInput } from './dto/otp.input';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { UserJwtAuthGuard } from './auth/guard/user.jwt.auth.guard';
import { CurrentUser } from './decorators/current-user';
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => OtpUserResponse)
  createOtp(@Args('phoneInput') phoneInput: PhoneInput) {
    return this.usersService.createOtpUser(phoneInput);
  }

  @Mutation(() => OtpVerifyResponse)
  async verifyOtp(@Args('otpInput') otpInput: OtpInput) {
    return this.usersService.verifyOtp(otpInput);
  }

  @Mutation(() => CreateUserResponse)
  @UseGuards(UserJwtAuthGuard)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @CurrentUser() currentUser: any,
  ) {
    return this.usersService.create(createUserInput, currentUser);
  }
}
