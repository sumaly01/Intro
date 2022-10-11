import { Model } from 'mongoose';

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminInput } from './dto/create-admin.input';
// import { UpdateAdminInput } from './dto/update-admin.input';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel: Model<Admin>) {}

  async create(createAdminInput: CreateAdminInput): Promise<Admin> {
    const admin = await this.findByEmail(createAdminInput.email);

    if (admin) {
      throw new BadRequestException('Email already used');
    }

    createAdminInput.password = await bcrypt.hash(
      createAdminInput.password,
      10,
    );
    const createdAdmin = new this.adminModel(createAdminInput);
    // createdAdmin.signedIn = false;
    const adminCreated = await createdAdmin.save();
    return adminCreated as Admin;
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminModel.find().exec();
    return admins;
  }

  async findByEmail(email: string) {
    return await this.adminModel.findOne({ email });
  }

  async findOne(id: string) {
    const admin = await this.adminModel.findOne({ _id: id });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  // update(id: number, updateAdminInput: UpdateAdminInput) {
  //   return `This action updates a #${id} admin`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
}
