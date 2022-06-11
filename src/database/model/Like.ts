import { Schema, model, Document , Types} from 'mongoose';

export const DOCUMENT_NAME = 'Like';
export const COLLECTION_NAME = 'likes';

export default interface Like extends Document{
    tweetId: Types.ObjectId,
    userId: Types.ObjectId
}

const schema = new Schema(
    {
        tweetId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Tweet'
        },
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        versionKey: false
    }
);

export const LikeModel = model<Like>(DOCUMENT_NAME, schema, COLLECTION_NAME);

 