import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Message = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const requestInfo = request.body;
        return data ? requestInfo?.[data] : requestInfo;
    },
);
