import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.body;
        const customName = user?.[data] + '_nestjs';
        return data ? customName : user;
    },
);
