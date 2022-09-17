import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
