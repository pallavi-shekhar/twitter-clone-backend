import { Request } from 'express';
import User from '../database/model/User';

declare interface PublicRequest extends Request {
    apiKey: string;
}

declare interface ProtectedRequest extends PublicRequest{
    user: User;
    accessToken: string;
}

declare interface Tokens{
    accessToken: string;
    refreshToken: string;
}