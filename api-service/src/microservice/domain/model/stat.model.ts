import { ApiProperty } from '@nestjs/swagger';

export class Stat {
  @ApiProperty({
    type: String,
    description: `Stock Quote Name`,
    example: 'ALPHABET'
  })
  stock: string;

  @ApiProperty({
    type: Number,
    description: `Number of Requested times`,
    example: 25
  })
  times_requested: number;
}
