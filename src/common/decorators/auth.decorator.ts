import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/schemas/user.schema';
import { RoleGuard } from 'src/common/guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: UserRole[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(AuthGuard, RolesGuard, RoleGuard)
    );
}

/*
- applyDecorators: Sử dụng để kết hợp nhiều decorators thành một.
- SetMetadata: Gắn metadata cho roles, sử dụng để kiểm tra vai trò người dùng.
- RolesAdminGuard: Áp dụng các guards cho xác thực (AuthGuard) và ủy quyền (RolesGuard).
*/