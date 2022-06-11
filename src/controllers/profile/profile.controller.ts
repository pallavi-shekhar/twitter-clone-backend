import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';
import asyncHandler from "../../middlewares/asyncHandler";


const my = asyncHandler(async (req: ProtectedRequest, res) => {
    const profile = await UserRepo.profileDetails(new Types.ObjectId(req.user._id));
    
    return new SuccessResponse('Profile fetched successfully', profile).send(res);
});

const get = asyncHandler(async (req: ProtectedRequest, res) => {
    const profile = await UserRepo.profileDetails(new Types.ObjectId(req.params.id));
    if(!profile)
        throw new BadRequestError('User does not exist');

    return new SuccessResponse('User profile fetched successfully', profile).send(res);
});

const ProfileController = { my, get };
export default ProfileController;




