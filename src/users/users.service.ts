import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OtpInput } from './dto/otp.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PhoneInput } from './dto/phone.input';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createOtpUser(phoneInput: PhoneInput) {
    const otp = 7777; //random number
    const phoneExists = await this.userModel.findOne({
      phone_number: phoneInput.phone_number,
    });

    if (!phoneExists) {
      const phoneSaved = new this.userModel({
        phone_number: phoneInput.phone_number,
        otp,
        expiry_time: new Date(Date.now() + 60000),
        newUser: true,
      });
      const otpSaved = await phoneSaved.save();
      return otpSaved;
    }

    phoneExists.otp = otp;
    phoneExists.expiry_time = new Date(Date.now() + 60000);
    if (!phoneExists.name) {
      phoneExists.newUser = true;
    } else {
      phoneExists.newUser = false;
    }
    const updatedOtpUser = await phoneExists.save();
    // console.log('Updated');

    return updatedOtpUser;
  }

  async verifyOtp(otpInput: OtpInput) {
    const userExists = await this.userModel.findOne({
      phone_number: otpInput.phone_number,
    });
    if (!userExists) {
      throw new BadRequestException('Enter your number again');
    }
    if (otpInput.otp !== userExists.otp) {
      throw new BadRequestException('Invalid otp');
    }

    //check expiry
    if (userExists.expiry_time - Date.now() < 0) {
      throw new BadRequestException('Otp already expired');
    }

    userExists.verifyOtp = true;
    await userExists.save();
    return true;
  }
  // async create(createUserInitialInput: CreateUserInitialInput): Promise<User> {
  //   const userExists = await this.userModel.findOne({
  //     phone_number: createUserInitialInput.phone_number,
  //   });
  //   if (!userExists) {

  //   }
  //   const createdUser = new this.userModel(createUserInitialInput);
  //   return createdUser.save();
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
