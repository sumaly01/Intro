import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
// import { Admin } from './entities/admin.entity';
// import { AdminSchema } from './schemas/admin.schema';
import { CreateAdminInput } from './dto/create-admin.input';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt.auth.guard';
// import { UpdateAdminInput } from './dto/update-admin.input';
import { CreateUserResponse } from 'src/users/dto/create-user.response';
import { CurrentAdmin } from './auth/decorators/current-admin';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => CreateAdminDto)
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateAdminInput,
  ) {
    return this.adminService.create(createAdminInput);
  }

  @Query(() => [CreateAdminDto])
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.adminService.findAll();
  }

  @Query(() => [CreateUserResponse])
  @UseGuards(JwtAuthGuard)
  async listUser() {
    return await this.adminService.listUser();
  }

  @Query(() => CreateAdminDto, { name: 'AdminProfile' })
  @UseGuards(JwtAuthGuard)
  async myProfile(@CurrentAdmin() currentAdmin: any) {
    return currentAdmin;
  }
}
