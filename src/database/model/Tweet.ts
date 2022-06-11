import { Schema, Types, model, Document } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Tweet';
export const COLLECTION_NAME = 'tweets';

export default interface Tweet extends Document {
    content: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    imageUrl: string;
}

const schema = new Schema(
    {
        content:{
            type: Schema.Types.String,
            required: true,
            maxlength: 280
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        createdAt:{
            type: Schema.Types.Date,
            required: true
        },
        imageUrl:{
            type: Schema.Types.String,
            trim:true
        }
    },
    {
        versionKey: false
    }
);

export const TweetModel = model<Tweet>(DOCUMENT_NAME, schema, COLLECTION_NAME);