import { Injectable, Scope } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthValidatorService {
    validateCreationRequest(data: SignUpDto) {
        if (!data.name || !data.email || !data.password) {
            throw new Error('Invalid request data');
        }
        return true;
    }
}
