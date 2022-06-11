import { Types } from 'mongoose';
import Tweet, { TweetModel } from '../model/Tweet';
import User from '../model/User';


export default class TweetRepo {

    public static async create(tweet: Tweet): Promise<Tweet> {
        tweet.createdAt = new Date();
        
        return await TweetModel.create(tweet);
    }

    public static getById(id: Types.ObjectId): Promise<Tweet | null> {

        return  TweetModel.findOne({ _id: id})
                        .populate('user', 'username email')
                        .lean<Tweet>()
                        .exec();
    }

    public static async getByUser(user: User) : Promise<Tweet[] | null> {
        
            return  TweetModel.find({ createdBy: user._id})
                        .populate('user', 'firstname profilePicUrl')
                        .lean<Tweet[]>()
                        .exec();      

    }

    public static async getByUserId(userId: Types.ObjectId) : Promise<Tweet[] | null> {
    
        return TweetModel.find({ createdBy: userId}).lean<Tweet[]>().exec();     
    }

    public static async search(searchTerm: string) : Promise<Tweet[] | null> {
        
        return TweetModel.find({ "content" : { $regex: searchTerm, $options: 'i'}}).lean<Tweet[]>().exec(); 
    }

}
