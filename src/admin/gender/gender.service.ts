import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGenderInput } from './dto/create-gender.input';
import { UpdateGenderInput } from './dto/update-gender.input';
import { Gender } from './entities/gender.entity';
import { DeleteGenderInput } from './dto/delete-gender.input';

@Injectable()
export class GenderService {
  constructor(@InjectModel('Gender') private genderModel: Model<Gender>) {}
  async create(createGenderInput: CreateGenderInput): Promise<Gender> {
    const genderExists = await this.findGenderByName(createGenderInput);
    // const gender = await this.genderModel.findOne({
    //   genderName: createGenderInput.genderName.toLowerCase(),
    // });
    if (genderExists && !genderExists.isDeleted) {
      throw new BadRequestException('Gender already exists!');
    }
    const createdGender = new this.genderModel(createGenderInput);
    const genderCreated = await createdGender.save();
    return genderCreated as Gender;
  }

  async findAll() {
    const genders = await this.genderModel.find({ isDeleted: false }).exec();
    return genders;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} gender`;
  // }

  async update(updateGenderInput: UpdateGenderInput) {
    const gender = await this.genderModel.findById(updateGenderInput.id);
    if (!gender || gender.isDeleted) {
      throw new BadRequestException('Gender not found');
    }
    const genderExists = await this.findGenderByName(updateGenderInput);
    if (genderExists) {
      throw new BadRequestException('Gender already exists');
    }
    gender.genderName = updateGenderInput.genderName.toLowerCase();
    const updatedGender = await gender.save();
    return updatedGender;
  }

  async remove(deleteGenderInput: DeleteGenderInput) {
    const gender = await this.genderModel.findById(deleteGenderInput.id);
    if (!gender || gender.isDeleted) {
      throw new BadRequestException('Gender not found');
    }
    if (!deleteGenderInput.confirmDelete) {
      throw new BadRequestException('Confirm your deletion');
    }
    gender.isDeleted = true;
    const updatedDeletionGender = await gender.save();

    return updatedDeletionGender;
  }

  async findGenderByName(gender: CreateGenderInput) {
    const genderExist = await this.genderModel.findOne({
      genderName: gender.genderName.toLowerCase(),
    });
    return genderExist;
  }
}
