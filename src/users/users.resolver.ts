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
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  // @Query(() => [User], { name: 'users' })
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
