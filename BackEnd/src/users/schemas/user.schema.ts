import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
export type userDocument = User & Document;

@Schema()
export class User {
    @Prop()
    id:string;

    @Prop()
    name: string;

    @Prop()
    job: string;
}
export const userSchema = SchemaFactory.createForClass(User);