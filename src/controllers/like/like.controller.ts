import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import { BadRequestError, NoDataError } from "../../core/ApiError";
import { SuccessResponse } from '../../core/ApiResponse';
import LikeRepo from '../../database/repository/LikeRepo';
import Like from '../../database/model/Like';
import TweetRepo from '../../database/repository/TweetRepo';
import asyncHandler from '../../middlewares/asyncHandler';


const create = asyncHandler( async (req: ProtectedRequest, res) => {
    const tweet = await TweetRepo.getById(new Types.ObjectId(req.params.id));
    if(!tweet) 
        throw new BadRequestError('Tweet does not exist');

    const like = await LikeRepo.create({
        userId: req.user._id,
        tweetId: tweet._id
    } as Like);

    new SuccessResponse('Tweet Liked ', like).send(res);
});

const LikeController = { create };
export default LikeController;




