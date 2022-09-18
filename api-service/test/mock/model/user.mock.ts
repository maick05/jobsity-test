import { EnumUserRole } from './../../../src/microservice/domain/enum/user-role.enum';
import { User } from './../../../src/microservice/domain/schema/user.schema';

export const mockUser = () => {
  const user = new User();
  user.email = 'any_email';
  user.password = 'any_password';
  user.password = EnumUserRole.USER;
  return user;
};
