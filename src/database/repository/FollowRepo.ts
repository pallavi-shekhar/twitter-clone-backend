import Follow, { FollowModel} from '../model/Follow';
import { Types} from 'mongoose';
import { InternalError } from '../../core/ApiError';

export default class FollowRepo{
    public static async create(followerId: Types.ObjectId, followeeId: Types.ObjectId): Promise<Follow> { 

        const follower =  await FollowModel.findOne({ follower: followerId, followee: followeeId}).lean<Follow>().exec();
        if(follower!=null) 
            throw new InternalError('Already following');

        return FollowModel.create({ follower: followerId, followee: followeeId});
    }

    public static async remove(followerId: Types.ObjectId, followeeId: Types.ObjectId): Promise<Follow | null> {
        const followerToBeRemoved =  FollowModel.findOne({ follower:  followerId, followee: followeeId}).
                                    lean<Follow>()
                                    .exec();

        const fToRemove = await followerToBeRemoved;
        if(fToRemove==null) 
            throw new InternalError('Not following');

        return FollowModel.findByIdAndRemove(fToRemove._id);
    }

    public static async followings(userId: Types.ObjectId) : Promise<Follow[]|null> {

        return FollowModel.find({ follower: userId})
                          .select('followee')
                          .populate('followee', 'firstName')
                          .lean<Follow[]>()
                          .exec();
    }

    public static async followers(userId: Types.ObjectId) : Promise<Follow[]|null> {

        return FollowModel.find({ followee: userId})
                          .select('follower')
                          .populate('followee', 'firstName')
                          .lean<Follow[]>()
                          .exec();
    }
}

