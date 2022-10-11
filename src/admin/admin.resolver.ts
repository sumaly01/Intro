import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { AdminService } from './admin.service';
// import { Admin } from './entities/admin.entity';
// import { AdminSchema } from './schemas/admin.schema';
import { CreateAdminInput } from './dto/create-admin.input';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt.auth.guard';
// import { UpdateAdminInput } from './dto/update-admin.input';

@Resolver(() => CreateAdminDto)
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

  // @Query(() => CreateAdminDto)
  // login(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
  //   return this.adminService.login(createAdminInput);
  // }

  // @Query(() => Admin, { name: 'admin' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.adminService.findOne(id);
  // }

  // @Mutation(() => Admin)
  // updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
  //   return this.adminService.update(updateAdminInput.id, updateAdminInput);
  // }

  // @Mutation(() => Admin)
  // removeAdmin(@Args('id', { type: () => Int }) id: number) {
  //   return this.adminService.remove(id);
  // }
}
