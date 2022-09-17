import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmResetPasswordDTO {
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
    type: Number,
    description: `Security code to reset password`,
    example: 123456
  })
  @IsNotEmpty()
  @IsNumber()
  code: number;
}
