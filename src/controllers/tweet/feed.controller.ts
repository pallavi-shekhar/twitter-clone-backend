import { ProtectedRequest } from "app-request";
import FollowRepo from "../../database/repository/FollowRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import Tweet from "../../database/model/Tweet";
import TweetRepo  from "../../database/repository/TweetRepo";
import asyncHandler from "../../middlewares/asyncHandler";

const getFeed = asyncHandler( async(req: ProtectedRequest, res) =>{
    const followingList = await FollowRepo.followings(req.user._id);  
    let tweets: Tweet[] = [];

    if(followingList!=null) {
        await Promise.all(followingList.map(async (following) => {
            let tweetsByFollowers =  await TweetRepo.getByUserId(following.followee);
            if(tweetsByFollowers!=null) tweets.push(...tweetsByFollowers);
        }));            
    }

    new SuccessResponse('Feeds Retrieved successfully', tweets).send(res);
});

const FeedController = { getFeed };
export default FeedController;
