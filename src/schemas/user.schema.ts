import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({required: true, enum: UserRole, default: UserRole.USER})
  roles: UserRole;

  @Prop({required: false})
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
