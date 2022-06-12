import _ from 'lodash';
import { ProtectedRequest } from "app-request";
import { validateTokenData, createTokens, getAccessToken } from '../../core/authUtils';
import JWT from '../../core/JWT';
import { TokenRefreshResponse } from '../../core/ApiResponse';
import { AuthFailureError } from '../../core/ApiError';
import UserRepo from '../../database/repository/UserRepo';
import asyncHandler from '../../middlewares/asyncHandler';
import { Types } from 'mongoose';

const token = asyncHandler(async (req: ProtectedRequest, res) => {
    req.accessToken = getAccessToken(req.headers.authorization);

    const accessTokenPayload = await JWT.decode(req.accessToken);
    validateTokenData(accessTokenPayload);

    const user = await UserRepo.findById(new Types.ObjectId(accessTokenPayload.sub));
    if (!user) 
      throw new AuthFailureError('User not registered');
    req.user = user;

    const refreshTokenPayload = await JWT.validate(req.body.refreshToken);
    validateTokenData(refreshTokenPayload);

    if (accessTokenPayload.sub !== refreshTokenPayload.sub)
      throw new AuthFailureError('Invalid access token');

    const tokens = await createTokens(req.user);

    new TokenRefreshResponse('Token Issued', tokens.accessToken, tokens.refreshToken).send(res);
  });

const TokenController = { token };
export default TokenController;
