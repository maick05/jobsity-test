import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockHistoryDocument = StockHistory & Document;

@Schema({ timestamps: true, collection: 'history' })
export class StockHistory {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true, type: Number })
  open: number;

  @Prop({ required: true, type: Number })
  high: number;

  @Prop({ required: true, type: Number })
  low: number;

  @Prop({ required: true, type: Number })
  close: number;
}

const schema = SchemaFactory.createForClass(StockHistory);
export const StockHistorySchema = schema;
