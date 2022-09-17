import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumUserRole } from '../enum/user-role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  role: EnumUserRole;
}

const schema = SchemaFactory.createForClass(User);
export const UserSchema = schema;
