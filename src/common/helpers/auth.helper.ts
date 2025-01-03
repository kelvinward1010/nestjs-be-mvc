import * as bcrypt from 'bcryptjs';

export class AuthHelper {
    private readonly satlRounds = 10;

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.satlRounds);
        const hashPassword = bcrypt.hash(password, salt);
        return hashPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}