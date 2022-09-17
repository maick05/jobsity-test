import { ApiProperty } from '@nestjs/swagger';

export class StockResponse {
  symbols: Stock[];
}

export class Stock {
  @ApiProperty({
    type: String,
    description: `Stock Quote Symbol`,
    example: 'GOOGL.US'
  })
  symbol: string;

  @ApiProperty({
    type: String,
    description: `Stock Quote Name`,
    example: 'ALPHABET'
  })
  name: string;

  @ApiProperty({
    type: String,
    description: `Date Stock Quote`,
    example: '2022-09-16'
  })
  date: string;

  @ApiProperty({
    type: String,
    description: `Date Time Stock Quote`,
    example: '22:00:07'
  })
  time: string;

  @ApiProperty({
    type: Number,
    description: `Open/First day value`,
    example: 102.07
  })
  open: number;

  @ApiProperty({
    type: Number,
    description: `Highest day value`,
    example: 111.07
  })
  high: number;

  @ApiProperty({
    type: Number,
    description: `Lowest day value`,
    example: 101.07
  })
  low: number;

  @ApiProperty({
    type: Number,
    description: `Close/Last day value`,
    example: 105.07
  })
  close: number;

  @ApiProperty({
    type: Number,
    description: `Financial Transactions Volume`,
    example: 42797172
  })
  volume: number;
}
