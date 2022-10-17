import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
// import { User } from './entities/user.entity';
// import { CreateUserInitialInput } from './dto/create-user-initial.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserResponse } from './dto/create-user.response';
import { PhoneInput } from './dto/phone.input';
import { OtpUserResponse } from './dto/otp-user.response';
import { OtpVerifyResponse } from './dto/otp-verification.response';
import { Query } from '@nestjs/common';
import { OtpInput } from './dto/otp.input';
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => OtpUserResponse)
  createOtp(@Args('phoneInput') phoneInput: PhoneInput) {
    return this.usersService.createOtpUser(phoneInput);
  }

  @Mutation(() => OtpVerifyResponse)
  async verifyOtp(@Args('otpInput') otpInput: OtpInput) {
    const verification = this.usersService.verifyOtp(otpInput);
    return { otpVerify: verification ? verification : false };
  }
  // createUser(
  //   @Args('createUserInput') createUserInitialInput: CreateUserInitialInput,
  // ) {
  //   return this.usersService.create(createUserInitialInput);
  // }

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
