import { model, Schema, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface User extends Document {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    dateOfJoining?: Date;
    bio?: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema(
    {
        username: {
            type: Schema.Types.String,
            required: true,
            trim: true,
            maxlength: 100
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            maxlength: 200,
            select: false
        },
        password: {
            type: Schema.Types.String,
            required: true,
            select: false
        },
        firstName: {
            type: Schema.Types.String,
            required: true,
            maxlength: 50,
            trim: true
        },
        lastName:{
            type: Schema.Types.String,
            required: true,
            maxlength: 50,
            trim: true
        },
        dateOfBirth:{
            type: Schema.Types.Date,
        },
        dateOfJoining:{
            type: Schema.Types.Date,
        },
        bio: {
            type: Schema.Types.String,
        },
        status:{
            type: Schema.Types.Boolean,
            default: true
        },
        createdAt: {
            type: Date,
            required: true,
            select: false,
        },
        updatedAt: {
            type: Date,
            required: true,
            select: false,
        }
    },
    {
        versionKey: false
    }
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);