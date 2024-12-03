import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";


@Injectable()
export class RolesAdminGuard implements CanActivate{
    constructor(
        @Inject('AccessJwtService') private accessJwtService: JwtService, 
        private readonly reflector: Reflector
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        if (!token) { 
            throw new UnauthorizedException('Token not found'); 
        } 
        try {
            const payload = this.accessJwtService.verify(token, { secret: process.env.ACCESS_SECRET_KEY });
            return payload.roles && payload.roles.includes('admin'); 
        } catch (error) { 
            throw new UnauthorizedException('Invalid token'); 
        }
    }

    private extractTokenFromHeader(request: Request): string | null { 
        const [type, token] = request.headers.authorization?.split(' ') ?? []; 
        return type === 'Bearer' ? token : null;
    }
}