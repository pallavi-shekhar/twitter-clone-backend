import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import { SuccessResponse } from '../../core/ApiResponse';
import FollowRepo from '../../database/repository/FollowRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const myFollowers = asyncHandler( async (req: ProtectedRequest, res) => {
    const followers = await FollowRepo.followers(req.user._id);
    
    new SuccessResponse('Followers List', followers).send(res);
});

const userFollowers =  asyncHandler( async (req: ProtectedRequest, res) => {
    const followers = await FollowRepo.followers(Types.ObjectId(req.params.id));
    
    new SuccessResponse('Followers List', followers).send(res);
});

const FollowersController = { myFollowers, userFollowers };
export default FollowersController;

