import User, { UserModel } from '../model/User';
import { Types } from 'mongoose';


export default class UserRepo {
    public static findById(id: Types.ObjectId): Promise<User | null> {
        
        return UserModel.findOne({ _id: id, status: true})
            .select('+email +password')
            .lean<User>()
            .exec();
    }

    public static findByEmail(email: string): Promise<User | null> {

        return UserModel.findOne({ email: email, status: true})
            .select('+email +password')
            .lean<User>()
            .exec();
    }

    public static async create(
        user: User
    ): Promise<User> {
        const now = new Date();
        user.createdAt = user.updatedAt = user.dateOfJoining  = now;
        const createdUser = await UserModel.create(user);

        return createdUser;
    }

    public static async update(
        user: User,
    ): Promise<User> {
        user.updatedAt = new Date();
        await UserModel.updateOne({ _id: user._id }, { $set: { ...user}})
         .lean()
         .exec();

        return user;
    }

    public static updateinfo(user: User): Promise<any> {
        user.updatedAt = new Date();

        return UserModel.updateOne({ _id:  user._id }, { $set: { ...user}})
            .lean()
            .exec();
    }

    public static profileDetails(userId: Types.ObjectId): Promise<User|null>{

        return UserModel.findOne({ _id: userId, status: true})
            .select('username email firstName lastName')
            .lean<User>()
            .exec();
    }
}