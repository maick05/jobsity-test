import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SecurityTokenDocument = SecurityToken & Document;

@Schema({ timestamps: true, collection: 'securityTokens' })
export class SecurityToken {
  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: true })
  code: number;

  @Prop({ required: true, type: Boolean })
  active: boolean;

  @Prop({ required: true, type: Date })
  expireDate: Date;
}

const schema = SchemaFactory.createForClass(SecurityToken);
export const SecurityTokenSchema = schema;
