import Like, { LikeModel } from '../model/Like';

export default class LikeRepo{
    public static async create(like: Like) : Promise<Like> {
        
        return LikeModel.create(like);
    }
}
