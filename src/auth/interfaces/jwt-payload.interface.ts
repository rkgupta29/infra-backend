import { UserRole } from '../decorators/roles.decorator';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
}
