import { JwtService } from '@nestjs/jwt';

export const AccessJwtProvider = {
    provide: 'AccessJwtService',
    useFactory: (jwtService: JwtService) => {
        return new JwtService({
            secret: process.env.ACCESS_SECRET_KEY,
            signOptions: { expiresIn: '60m' },
        });
    },
    inject: [JwtService],
};

export const RefreshJwtProvider = {
    provide: 'RefreshJwtService',
    useFactory: (jwtService: JwtService) => {
        return new JwtService({
            secret: process.env.REFRESH_SECRET_KEY,
            signOptions: { expiresIn: '7d' },
        });
    },
    inject: [JwtService],
};
