import bcrypt from 'bcrypt';
import _ from 'lodash';
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import User from '../../database/model/User';
import { createTokens } from '../../core/authUtils';
import asyncHandler from '../../middlewares/asyncHandler';

const signUp = asyncHandler(async (req: ProtectedRequest, res) => {

    const user = await UserRepo.findByEmail(req.body.email);
    if(user) 
        throw new BadRequestError('User aready registered');

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const createdUser = await UserRepo.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            dateOfBirth: req.body.dateOfBirth,
        } as User
    );

    const tokens = await createTokens(createdUser);

    new SuccessResponse('Signup Successful', {
        user: _.pick(createdUser, ['_id', 'username', 'email']),
        tokens: tokens
    }).send(res);
});

const SignUpController = { signUp };
export default SignUpController;