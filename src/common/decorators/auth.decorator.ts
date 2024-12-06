import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/schemas/user.schema';
import { RolesGuard } from 'src/common/guards/role.guard';
import { RolesAdminGuard } from '../guards/role.guard.admin';

export function Auth(...roles: UserRole[]) {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(RolesAdminGuard, RolesGuard)
    );
}

/*
- applyDecorators: Sử dụng để kết hợp nhiều decorators thành một.
- SetMetadata: Gắn metadata cho roles, sử dụng để kiểm tra vai trò người dùng.
- RolesAdminGuard: Áp dụng các guards cho xác thực (AuthGuard) và ủy quyền (RolesGuard).
*/