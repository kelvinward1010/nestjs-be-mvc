import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";



@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        console.log(roles)
        if(!token) return false;
        return true;
    }

    private extractTokenFromHeader(request: Request): string | null { 
        const [type, token] = request.headers.authorization?.split(' ') ?? []; 
        return type === 'Bearer' ? token : null;
    }
}