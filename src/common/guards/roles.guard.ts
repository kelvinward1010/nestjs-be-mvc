import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request: any = context.switchToHttp().getRequest<Request>();
        const user = request.user;

        if (roles.some(role => user.roles.includes(role))) {
            return true;
        }

        throw new ForbiddenException('Forbidden');
    }
}
