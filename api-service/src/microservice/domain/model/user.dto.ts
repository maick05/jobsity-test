import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EnumUserRole } from '../enum/user-role.enum';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: EnumUserRole;
}
