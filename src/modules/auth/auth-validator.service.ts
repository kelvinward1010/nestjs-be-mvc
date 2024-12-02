import { Injectable, Scope } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthValidatorService {
    validateCreationRequest(data: SignUpDto) {
        console.log(data)
        if (!data.name || !data.email || !data.password || !data.age) {
            throw new Error('Invalid request data');
        }
        return true;
    }
}
