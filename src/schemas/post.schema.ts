import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<IPost>;

@Schema()
export class IPost {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    ownerId: string;
}

export const PostSchema = SchemaFactory.createForClass(IPost);
