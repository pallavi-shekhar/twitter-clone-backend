import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from '../../core/ApiResponse';
import FollowRepo from '../../database/repository/FollowRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const unfollow =  asyncHandler(async (req:ProtectedRequest, res) => {
    if((req.user._id).toString() === req.params.id) 
        throw new BadRequestError('Unfollowing self is not allowed');

    const followingUnfollowed = await FollowRepo.remove(req.user._id, Types.ObjectId(req.params.id))
    
    new SuccessResponse('Unfollowed successfully', followingUnfollowed).send(res);
});

const UnfollowController = { unfollow };
export default UnfollowController;