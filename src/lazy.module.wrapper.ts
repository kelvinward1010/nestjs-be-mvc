import { DynamicModule, Module, forwardRef } from '@nestjs/common';

@Module({})
export class LazyModuleWrapper {
    static async forRoot(path: string, moduleName: string): Promise<DynamicModule> {
        const importedModule = await import(path);
        const moduleRef = importedModule[moduleName];

        if (!moduleRef) {
            throw new Error(`Module ${moduleName} not found in path ${path}`);
        }

        return {
            module: LazyModuleWrapper,
            imports: [forwardRef(() => moduleRef)],
        };
    }
}


@Module({})
export class UsersLazyModule {
    static register(): DynamicModule {
        return {
            module: UsersLazyModule,
            imports: [forwardRef(() => import('./modules/user/user.module').then(m => m.UserModule))],
        };
    }
}


@Module({})
export class AuthLazyModule {
    static register(): DynamicModule {
        return {
            module: AuthLazyModule,
            imports: [forwardRef(() => import('./modules/auth/auth.module').then(m => m.AuthModule))],
        };
    }
}