import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type StockHistoryDocument = StockHistory & Document;

@Schema({ timestamps: true, collection: 'history' })
export class StockHistory {
  @Prop({ required: true })
  userEmail: string;

  @ApiProperty({
    type: String,
    description: `Date Stock Quote`,
    example: '2022-09-16'
  })
  @Prop({ required: true, type: Date })
  date: Date;

  @ApiProperty({
    type: String,
    description: `Stock Quote Name`,
    example: 'ALPHABET'
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    type: String,
    description: `Stock Quote Symbol`,
    example: 'GOOGL.US'
  })
  @Prop({ required: true })
  symbol: string;

  @ApiProperty({
    type: Number,
    description: `Open/First day value`,
    example: 102.07
  })
  @Prop({ required: true, type: Number })
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
}

const schema = SchemaFactory.createForClass(StockHistory);
export const StockHistorySchema = schema;
