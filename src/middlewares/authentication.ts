import express from 'express';
import { ProtectedRequest } from '../types/app-request';
import UserRepo from '../database/repository/UserRepo';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../core/ApiError';
import JWT from '../core/JWT';
import { getAccessToken, validateTokenData } from '../core/authUtils';
import { Types } from 'mongoose';
import validator, { ValidationSource } from './validator';
import schema from './schema';
import asyncHandler from './asyncHandler';

const router = express.Router();

export default router.use(
    validator(schema.auth, ValidationSource.HEADER),
    asyncHandler(async (req: ProtectedRequest, res, next) => {
        req.accessToken = getAccessToken(req.headers.authorization);

        try{
            const payload = await JWT.validate(req.accessToken);
            validateTokenData(payload);

            const user = await UserRepo.findById(new Types.ObjectId(payload.sub));
            if(!user) 
                throw new AuthFailureError('User not registered');
            
            req.user = user;

            return next();
        } catch(error) {
            if( error instanceof TokenExpiredError) throw new AccessTokenError(error.message);
            throw error;
        }
    })
);

