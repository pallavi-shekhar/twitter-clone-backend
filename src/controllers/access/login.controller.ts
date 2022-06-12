import bcrypt from 'bcrypt';
import _ from 'lodash';
import { AuthFailureError, BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import { createTokens } from '../../core/authUtils';
import asyncHandler from '../../middlewares/asyncHandler';

const login = asyncHandler(async (req,res) => {
    const user = await UserRepo.findByEmail(req.body.email);
    if(!user) 
        throw new BadRequestError('User not registered');

    if(!user.password) 
        throw new BadRequestError('Credential not set');

    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) 
        throw new AuthFailureError('Authentication failure');

    const tokens = await createTokens(user);

    new SuccessResponse('Login Success', {
        user: _.pick(user, ['_id', 'username']),
        tokens: tokens
    }).send(res);
});

const LoginController = { login };
export default LoginController;