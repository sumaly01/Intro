import { BadRequestException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Intro } from './entities/intro.entity';
import { CreateIntroInput } from './dto/create-intro.input';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users.service';
import { GenderService } from 'src/admin/gender/gender.service';

@Injectable()
export class IntroService {
  constructor(
    @InjectModel('Intro') private introModel: Model<Intro>,
    private config: ConfigService,
    private userService: UsersService,
    private genderService: GenderService,
  ) {}

  async createIntro(createIntroInput: CreateIntroInput, userId: any) {
    const profileExists = await this.userService.findUserById(userId);
    if (!profileExists.newUser) {
      const introCreated = new this.introModel(createIntroInput);
      introCreated.fileDirectory = this.config.get<string>('VIDEO_PATH');
      introCreated.filePath = `${this.config.get<string>('VIDEO_PATH')}/${
        createIntroInput.fileName
      }`;
      introCreated.createdBy = userId;

      const findIntro = await this.introModel.updateMany(
        { createdBy: userId },
        { $set: { currentIntro: false } },
        { new: true },
      );
      console.log({ findIntro });

      const introSaved = await introCreated.save();

      const findUser = await introSaved.populate([
        { path: 'createdBy', select: { _id: 1, name: 1 } },
      ]);
      // console.log({ findUser });
      return findUser;
    } else {
      throw new BadRequestException('Complete your profile setup');
    }
  }

  async listMyIntro(userId: string) {
    const profileExists = await this.userService.findUserById(userId);
    if (!profileExists.newUser) {
      const intro = await this.introModel.aggregate([
        {
          $match: {
            createdBy: new mongoose.Types.ObjectId(userId), //string to objectID
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: '_id',
            as: 'createdBy',
          },
        },
        { $unwind: '$createdBy' },
      ]);
      // console.log({ intro });
      return intro;
    } else {
      throw new BadRequestException('Complete your profile setup');
    }
  }

  async viewIntroFeed(userId: string) {
    const profileExists = await this.userService.findUserById(userId);
    if (!profileExists.newUser) {
      const user = await this.userService.findUserById(userId);
      if (user && user.interestedIn) {
        let validUsers = await this.genderService.searchUserByGenderSlug(
          user.interestedIn,
        );

        validUsers = validUsers.map((x) => new mongoose.Types.ObjectId(x._id));
        let returnUser = [];
        if (user?.interests?.length) {
          returnUser = await this.introModel.aggregate([
            {
              $match: {
                $and: [
                  { createdBy: { $in: validUsers } }, //for array
                  {
                    createdBy: {
                      $nin: [new mongoose.Types.ObjectId(user._id)],
                    },
                  },
                ],
                isDeleted: false,
                currentIntro: true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy',
              }, //in array
            },
            { $unwind: '$createdBy' },
            {
              $match: {
                'createdBy.interests': { $in: user.interests }, //for array atleast one match
              },
            },
          ]);
        }

        if (returnUser.length < 1) {
          returnUser = await this.introModel.aggregate([
            {
              $match: {
                $and: [
                  { createdBy: { $in: validUsers } }, //for array
                  {
                    createdBy: {
                      $nin: [new mongoose.Types.ObjectId(user._id)],
                    },
                  },
                ],
                isDeleted: false,
                currentIntro: true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy',
              }, //in array
            },
            { $unwind: '$createdBy' },
          ]);
        }
        // console.log({ returnUser });
        return returnUser;
      } else {
        throw new BadRequestException('Select your interested gender');
      }
    } else {
      throw new BadRequestException('Complete your profile setup');
    }
  }
}
