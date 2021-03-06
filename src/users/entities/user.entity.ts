import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string;
    @Prop()
    login: string;

    @Prop()
    password: string;

    @Prop()
    user_type: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);
