import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GenderService } from './gender.service';
import { CreateGenderInput } from './dto/create-gender.input';
import { UpdateGenderInput } from './dto/update-gender.input';
import { CreateGenderResponse } from './dto/create-gender.response';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { DeleteGenderInput } from './dto/delete-gender.input';
import { CreateUserResponse } from 'src/users/dto/create-user.response';
import { SearchGenderSlugInput } from './dto/search-gender';
@Resolver()
export class GenderResolver {
  constructor(private readonly genderService: GenderService) {}

  @Mutation(() => CreateGenderResponse)
  @UseGuards(JwtAuthGuard)
  createGender(
    @Args('createGenderInput') createGenderInput: CreateGenderInput,
  ) {
    return this.genderService.create(createGenderInput);
  }

  @Query(() => [CreateGenderResponse], { name: 'findGenders' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.genderService.findAll();
  }

  @Mutation(() => CreateGenderResponse)
  @UseGuards(JwtAuthGuard)
  updateGender(
    @Args('updateGenderInput') updateGenderInput: UpdateGenderInput,
  ) {
    return this.genderService.update(updateGenderInput);
  }

  // @Mutation(() => CreateGenderResponse)
  // @UseGuards(JwtAuthGuard)
  // removeGender(
  //   @Args('deleteGenderInput') deleteGenderInput: DeleteGenderInput,
  // ) {
  //   return this.genderService.remove(deleteGenderInput);
  // }

  @Mutation(() => CreateGenderResponse)
  @UseGuards(JwtAuthGuard)
  removeGender(@Args('id') deleteGenderInput: DeleteGenderInput) {
    return this.genderService.removeGender(deleteGenderInput._id);
  }

  @Mutation(() => [CreateUserResponse])
  @UseGuards(JwtAuthGuard)
  searchGendersBySlug(
    @Args('searchGenders') searchGender: SearchGenderSlugInput,
  ) {
    return this.genderService.searchUserByGenderSlug(searchGender.slugName);
  }

  @Query(() => CreateGenderResponse)
  @UseGuards(JwtAuthGuard)
  findGenderById(@Args('id') id: string) {
    return this.genderService.findGenderById(id);
  }
}
