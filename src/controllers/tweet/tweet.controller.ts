import { ProtectedRequest } from "app-request";
import { Types } from "mongoose";
import UserRepo from "../../database/repository/UserRepo";
import { BadRequestError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import Tweet from "../../database/model/Tweet";
import TweetRepo from "../../database/repository/TweetRepo";
import asyncHandler from "../../middlewares/asyncHandler";


const create = asyncHandler(async (req: ProtectedRequest, res) => {
    const tweet = await TweetRepo.create({
        content: req.body.content,
        createdBy: req.user._id,
        imageUrl: req.body.imageUrl       
    } as Tweet);
    
    new SuccessResponse('Tweet created successfully', tweet).send(res);
}); 

const getById = asyncHandler(async (req: ProtectedRequest, res) => {
    const tweet = await TweetRepo.getById(new Types.ObjectId(req.params.id));
    if(!tweet) throw new BadRequestError('Tweet does not exist');

    return new SuccessResponse('Tweet fetched successfully', tweet).send(res);
});

const getTweetByUser = asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findById(Types.ObjectId(req.params.id));
    if(!user)
        throw new BadRequestError('User does not exist');

    const tweets = await TweetRepo.getByUserId(Types.ObjectId(req.params.id));

    return new SuccessResponse('Tweet fetched successfully', tweets).send(res);
});

const getMyTweets = asyncHandler(async (req: ProtectedRequest, res) => {
    const tweets = await TweetRepo.getByUser(req.user);

    return new SuccessResponse('Tweet fetched successfully', tweets).send(res);
});

const TweetController = { create, getById, getTweetByUser,  getMyTweets };
export default TweetController;




