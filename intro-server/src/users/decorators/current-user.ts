import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    //     //token from header
    //     const u = ctx.getContext().req.headers.authorization.replace('Bearer ', '');
    console.log('current user = >', ctx.getContext().req.user);
    return ctx.getContext().req.user;
  },
);
