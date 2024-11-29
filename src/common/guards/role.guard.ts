import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";



@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector){}


    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log(token)
        return true;
    }

    private extractTokenFromHeader(request: Request): string | null { 
        const [type, token] = request.headers.authorization?.split(' ') ?? []; 
        return type === 'Bearer' ? token : null;
    }
}