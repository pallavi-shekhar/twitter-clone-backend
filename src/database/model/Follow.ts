import { Schema, model, Document, Types } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Follow';
export const COLLECTION_NAME = 'follows';

export default interface Follow extends Document{
    follower: Types.ObjectId;
    followee: Types.ObjectId;
    status: boolean;
}

const schema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    followee: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    }
},
{
    versionKey: false
});

export const FollowModel = model<Follow>(DOCUMENT_NAME, schema, COLLECTION_NAME);