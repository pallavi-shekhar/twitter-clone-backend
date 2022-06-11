import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from '../../core/ApiResponse';
import FollowRepo from '../../database/repository/FollowRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const create = asyncHandler(async (req: ProtectedRequest, res) => {
    if((req.user._id).toString() === req.params.id) 
        throw new BadRequestError('Following self is not allowed');
    
   const followerCreated = await FollowRepo.create(req.user._id, Types.ObjectId(req.params.id));
   
   new SuccessResponse('Follower created successfully', followerCreated).send(res);
})

const FollowController = { create };
export default FollowController;

