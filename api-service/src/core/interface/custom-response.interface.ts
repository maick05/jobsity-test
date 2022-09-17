import { ApiProperty } from '@nestjs/swagger';

export class CustomResponse {
  @ApiProperty({
    type: Boolean,
    description: `Success status`,
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: `Data response!`,
    example: 'Action requested!'
  })
  response: object | string | number;
}
