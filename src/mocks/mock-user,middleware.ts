import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        req.body = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            roles: ['user']
        };
        next();
    }
}
