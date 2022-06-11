import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import { SuccessResponse } from '../../core/ApiResponse';
import FollowRepo from '../../database/repository/FollowRepo';
import asyncHandler from '../../middlewares/asyncHandler';

const myFollowings = asyncHandler( async (req: ProtectedRequest, res) => {
    const followings = await FollowRepo.followings(req.user._id);
    
    new SuccessResponse('Followings List', followings).send(res);
});

const userFollowings =  asyncHandler( async (req: ProtectedRequest, res) => {
    const followings = await FollowRepo.followings(Types.ObjectId(req.params.id));
    
    new SuccessResponse('Followings List', followings).send(res);
});

const FollowingsController = { myFollowings, userFollowings };
export default FollowingsController;

