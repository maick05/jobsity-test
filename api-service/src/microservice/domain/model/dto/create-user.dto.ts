import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EnumUserRole } from '../../enum/user-role.enum';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    description: `User email`,
    example: 'jobsity@email.com'
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: `User role`,
    example: 'user',
    examples: [EnumUserRole.ADMIN, EnumUserRole.USER]
  })
  @IsNotEmpty()
  @IsString()
  role: EnumUserRole;
}
