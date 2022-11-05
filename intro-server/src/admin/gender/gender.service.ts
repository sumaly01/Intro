import { Model } from 'mongoose';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGenderInput } from './dto/create-gender.input';
import { UpdateGenderInput } from './dto/update-gender.input';
import { Gender } from './entities/gender.entity';
// import { DeleteGenderInput } from './dto/delete-gender.input';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class GenderService {
  constructor(
    @InjectModel('Gender') private genderModel: Model<Gender>,
    private userService: UsersService,
  ) {}
  async create(createGenderInput: CreateGenderInput): Promise<Gender> {
    const genderExists = await this.findGenderByName(
      createGenderInput.genderName,
    );
    if (genderExists && !genderExists.isDeleted) {
      throw new BadRequestException('Gender already exists!');
    }
    const orderExists = await this.findByOrder(createGenderInput.order);
    if (orderExists && !orderExists.isDeleted) {
      throw new BadRequestException('Change your order number');
    }

    const createdGender = new this.genderModel(createGenderInput);
    const genderCreated = await createdGender.save();
    return genderCreated as Gender;
  }

  async findAll() {
    const genders = await this.genderModel
      .find(/*{ isDeleted: false }*/)
      .sort({ order: 1 })
      .exec();
    return genders;
  }

  async update(updateGenderInput: UpdateGenderInput) {
    const gender = await this.genderModel.findById(updateGenderInput._id);
    if (!gender || gender.isDeleted) {
      throw new BadRequestException('Gender not found');
    }
    // if (updateGenderInput.genderName) {
    //   const genderExists = await this.findGenderByName(
    //     updateGenderInput.genderName,
    //   );
    //   if (genderExists && !genderExists.isDeleted) {
    //     throw new BadRequestException('Gender already exists');
    //   }
    // }
    // const orderExists = await this.findByOrder(updateGenderInput.order);
    // if (orderExists && !orderExists.isDeleted) {
    //   throw new BadRequestException('Order already exists');
    // }

    const genders = await this.genderModel
      .find({ _id: { $ne: updateGenderInput._id }, isDeleted: false })
      .exec();
    const genderNameTaken = genders.filter((gender) => {
      if (updateGenderInput.genderName) {
        return gender.genderName === updateGenderInput.genderName.toLowerCase();
      }
    });
    if (genderNameTaken && genderNameTaken.length) {
      throw new BadRequestException('Gender already exists');
    }

    const orderTaken = genders.filter(
      (gender) => gender.order == updateGenderInput.order,
    );
    if (orderTaken && orderTaken.length) {
      throw new BadRequestException('Order already exists');
    }

    const genderUpdate = await this.genderModel
      .findOneAndUpdate(
        { _id: updateGenderInput._id },
        { $set: updateGenderInput },
        { new: true },
      )
      .exec();
    console.log({ genderUpdate });
    return genderUpdate;
  }

  // async remove(deleteGenderInput: DeleteGenderInput) {
  //   const gender = await this.genderModel.findById(deleteGenderInput._id);
  //   if (!gender || gender.isDeleted) {
  //     throw new BadRequestException('Gender not found');
  //   }
  //   if (!deleteGenderInput.confirmDelete) {
  //     throw new BadRequestException('Confirm your deletion');
  //   }
  //   gender.isDeleted = true;
  //   const updatedDeletionGender = await gender.save();

  //   return updatedDeletionGender;
  // }

  async removeGender(id: string) {
    const gender = await this.genderModel.findById(id);
    if (!gender || gender.isDeleted) {
      throw new BadRequestException(
        'Gender not found or gender was already deleted',
      );
    }
    gender.isDeleted = true;
    const updatedDeletionGender = await gender.save();
    console.log({ updatedDeletionGender });
    return updatedDeletionGender;
  }

  async findGenderByName(gender: string) {
    const genderExist = await this.genderModel.findOne({
      genderName: gender.toLowerCase(),
    });
    return genderExist;
  }

  async findByOrder(order: number) {
    const orderExists = await this.genderModel.findOne({ order });
    return orderExists;
  }

  async findGenderIdBySlugName(slugName: string) {
    return await this.genderModel.distinct('_id', {
      slugName,
      // isDeleted: false,
    });
  } // [('jjj', 'kk')]; _id matra return

  async searchUserByGenderSlug(genderName: string) {
    let users = [];
    if (genderName.toLowerCase() === 'everyone') {
      users = await this.userService.findAll();
    } else {
      const validGenders = await this.findGenderIdBySlugName(genderName);
      // console.log({ validGenders });
      if (validGenders && validGenders.length) {
        users = await this.userService.findUserByMultipleGender(validGenders);
      }
    }
    return users;
  }

  async findGenderById(id: string) {
    const gender = await this.genderModel.findById(id);
    if (!gender) {
      throw new NotFoundException('Gender not found');
    }
    return gender;
  }
}
