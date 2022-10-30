import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateIntroInput } from './dto/create-intro.input';
import { IntroService } from './intro.service';
import { CreateIntroResponse } from './dto/create-intro.response';
import { UseGuards } from '@nestjs/common';
import { UserJwtAuthGuard } from '../auth/guard/user.jwt.auth.guard';
import { CurrentUser } from '../decorators/current-user';
@Resolver()
export class IntroResolver {
  constructor(private readonly introService: IntroService) {}

  @Mutation(() => CreateIntroResponse)
  @UseGuards(UserJwtAuthGuard)
  createIntro(
    @Args('createIntro') createIntroInput: CreateIntroInput,
    @CurrentUser() currentUser: any,
  ) {
    return this.introService.createIntro(createIntroInput, currentUser.id);
  }

  @Mutation(() => [CreateIntroResponse])
  @UseGuards(UserJwtAuthGuard)
  async listMyIntro(@CurrentUser() currentUser: any) {
    return await this.introService.listMyIntro(currentUser.id);
  }

  @Mutation(() => [CreateIntroResponse])
  @UseGuards(UserJwtAuthGuard)
  viewIntroFeed(@CurrentUser() currentUser: any) {
    return this.introService.viewIntroFeed(currentUser.id);
  }
}
