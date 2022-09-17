import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string;
}

const schema = SchemaFactory.createForClass(User);
schema.index({ name: 1, countryId: 1 }, { unique: true });

export const UserSchema = schema;
