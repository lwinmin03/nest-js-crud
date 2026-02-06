import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enum/user.role.enum';



@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
// Debugging: This helps you see why it fails
    console.log('Required Roles:', requiredRoles);
    console.log('User Role:', user?.role);

    // FIX: Check if the requiredRoles array contains the user's specific role
    return requiredRoles.includes(user?.role);
  }
}
