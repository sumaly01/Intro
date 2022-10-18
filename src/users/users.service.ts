import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OtpInput } from './dto/otp.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PhoneInput } from './dto/phone.input';
// import { UserAuthService } from './auth/user.auth.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './dto/create-user.input';
import { GenderService } from 'src/admin/gender/gender.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private genderService: GenderService,
    // private userAuthService: UserAuthService,
    private jwtService: JwtService,
  ) {}

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

    const payload = {
      sub: userExists.id,
      phone_number: userExists.phone_number,
    };
    const access_token = await this.generateUserToken(payload);

    return { id: userExists.id, access_token };
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id);
  }

  // token generate
  async generateUserToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async create(createUserInput: CreateUserInput) {
    const userExists = await this.userModel.findOne({
      phone_number: createUserInput.phone_number,
    });

    if (!userExists) {
      throw new BadRequestException('No user found');
    }
    const user = {
      birthday: createUserInput.birthday,
      name: createUserInput.name,
      interestedIn: createUserInput.interestedIn,
      interests: createUserInput.interests,
      email: createUserInput.email,
      gender: createUserInput.gender,
      newUser: false,
    };
    const userUpdate = await this.userModel
      .findByIdAndUpdate({ _id: userExists._id }, { $set: user }, { new: true })
      .populate([{ path: 'gender', select: { _id: 1, genderName: 1 } }]);
    // console.log('userupdate', userUpdate);
    return userUpdate;
  }

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
