import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumUserRole } from '../enum/user-role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: String })
  role: EnumUserRole;
}

const schema = SchemaFactory.createForClass(User);
schema.index({ email: 1, role: 1 }, { unique: true });
export const UserSchema = schema;
