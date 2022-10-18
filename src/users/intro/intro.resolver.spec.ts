import { Test, TestingModule } from '@nestjs/testing';
import { IntroResolver } from './intro.resolver';

describe('IntroResolver', () => {
  let resolver: IntroResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntroResolver],
    }).compile();

    resolver = module.get<IntroResolver>(IntroResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
