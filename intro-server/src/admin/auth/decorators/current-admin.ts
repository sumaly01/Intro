import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentAdmin = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    //token from header
    const u = ctx.getContext().req.headers.authorization.replace('Bearer ', '');
    console.log('current Admin = >', u);
    return ctx.getContext().req.user;
  },
);
