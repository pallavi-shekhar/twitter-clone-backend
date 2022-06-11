import { Types } from 'mongoose';
import { tokenInfo } from '../src/config';
import { BadTokenError } from '../src/core/ApiError';
import JWT, { JwtPayload } from '../src/core/JWT';
import ApiKey from '../src/database/model/ApiKey';
import User from '../src/database/model/User';
import Follow from '../src/database/model/Follow';
import * as authUtils from '../src/core/authutils';
import Tweet from '../src/database/model/Tweet';
import Like from '../src/database/model/Like';

export const ACCESS_TOKEN = 'xyz';
export const API_KEY = 'abc';
export const USER_ID = new Types.ObjectId();
export const USER_ID_2 = new Types.ObjectId();
export const USER_ID_ON_BEHALF = new Types.ObjectId();
export const TWEET_ID = new Types.ObjectId();
export const user = {
    _id: USER_ID,
    username: 'Pallavi',
    firstName: 'Pallavi',
    lastName: 'Shekhar',
    email: 'pallavi@gmail.com'
} as User;

export const user_on_behalf= {
    _id: USER_ID_ON_BEHALF,
    username: 'Amit',
    firstName: 'Amit',
    lastName: 'Shekhar',
    email: 'amit@gmail.com'
} as User;

export const tweet_1 = {
    _id: TWEET_ID,
    content: 'My Tweet 1',
    imageUrl: 'https://abc.com/xyz',
    createdBy: USER_ID
} as Tweet;

export const tweet_2 = {
    _id: new Types.ObjectId,
    content: 'My Tweet 2',
    imageUrl: 'https://abc.com/xyz',
    createdBy: USER_ID
} as Tweet;

export const user_tweet_1 = {
    _id: new Types.ObjectId,
    content: 'User Tweet 1',
    imageUrl: 'https://abc.com/xyz',
    createdBy: USER_ID_ON_BEHALF
} as Tweet;

export const user_tweet_2 = {
    _id: new Types.ObjectId,
    content: 'User Tweet 2',
    imageUrl: 'https://abc.com/xyz',
    createdBy: USER_ID_ON_BEHALF
} as Tweet;

export const follower_1 = {
    follower: USER_ID,
    followee: USER_ID_ON_BEHALF
} as Follow;

export const follower_2 = {
    follower: USER_ID,
    followee: USER_ID_2
} as Follow;

export const like_1 = {
    tweetId: user_tweet_1._id,
    userId: user._id
} as Like;

export const getAccessTokenSpy = jest.spyOn(authUtils, 'getAccessToken');

export const mockFindApiKey = jest.fn(async (key: string) => {
  if (key == API_KEY) return { key: API_KEY } as ApiKey;
  else return null;
});

jest.mock('../src/database/repository/ApiKeyRepo', () => ({
  get findByKey() {
    return mockFindApiKey;
  },
}));


export const mockGetProfileDetails = jest.fn(async (userId: Types.ObjectId) => {
    if(USER_ID.equals(userId)) {
        return user;
    }
    return null;
});

export const mockUserFindById = jest.fn(async (id: Types.ObjectId) => {
    if(USER_ID.equals(id))
        return { _id: USER_ID } as User;

    if(USER_ID_ON_BEHALF.equals(id))
        return { _id: USER_ID_ON_BEHALF } as User;

    return null;
});

jest.mock('../src/database/repository/UserRepo', () => ({
    get findById() {
        return mockUserFindById;
    },
    get profileDetails() {
        return mockGetProfileDetails;
    }
}));

export const mockJwtValidate = jest.fn(async (token: string): Promise<JwtPayload> => {
    if(token === ACCESS_TOKEN) {
        return {
            iss: tokenInfo.issuer,
            aud: tokenInfo.audience,
            sub: USER_ID.toHexString(),
            iat: 1,
            exp: 2
        } as JwtPayload
    }
    throw new BadTokenError();
});

JWT.validate = mockJwtValidate;

export const mockTweetCreate = jest.fn(async (tweet: Tweet): Promise<Tweet> => {
    return {
        _id: TWEET_ID,
        content: tweet.content,
        imageUrl: tweet.imageUrl,
        createdAt: new Date(),
        createdBy: tweet.createdBy
    } as Tweet;
});

export const mockGetTweetById = jest.fn(async (id: Types.ObjectId): Promise<Tweet | null> => {
    if(id.equals(TWEET_ID))
        return tweet_1;
    if(id.equals(user_tweet_1._id))
        return user_tweet_1;
    return null;
});

export const mockGetByUserId = jest.fn(async (id: Types.ObjectId): Promise<Tweet[] | null> => {
    if(USER_ID_ON_BEHALF.equals(id))
        return [user_tweet_1, user_tweet_2];
    return null;
});

export const mockGetByUser = jest.fn(async (id: Types.ObjectId): Promise<Tweet[]> => {
    return [tweet_1, tweet_2];
});


jest.mock('../src/database/repository/TweetRepo', () => ({
    get create() {
        return mockTweetCreate;
    },
    get getById() {
        return mockGetTweetById;
    },
    get getByUserId() {
        return mockGetByUserId;
    },
    get getByUser() {
        return mockGetByUser;
    }
}));

export const mockFollowings = jest.fn(async (userId: Types.ObjectId): Promise<Follow[] | null> => {
    if(userId.equals(USER_ID))
        return [follower_1, follower_2];
    else
        return null;
});

export const mockFollowCreate = jest.fn(async (followerId: Types.ObjectId, followeeId: Types.ObjectId): Promise<Follow | null> => {
    if(followerId.equals(USER_ID) && followeeId.equals(USER_ID_ON_BEHALF)) {
        return {
            follower: followeeId,
            followee: followeeId
        } as Follow
    }
    else
        return null;
});

jest.mock('../src/database/repository/FollowRepo', () => ({
    get followings() {
        return mockFollowings;
    },
    get create() {
       return mockFollowCreate;
    }
}));

export const mockLikeCreate = jest.fn(async (like: Like): Promise<Like | null> => {
    if(like.userId.equals(USER_ID) && like.tweetId.equals(user_tweet_1._id)) {
        return {
            tweetId: like.tweetId,
            userId: like.userId
        } as Like;
    }
    return null;
});

jest.mock('../src/database/repository/LikeRepo', () => ({
    get create() {
        return mockLikeCreate;
    }
}));

export const addHeaders = (request: any) => request.set('Content-Type', 'application/json').set('x-api-key', API_KEY).timeout(2000);
export const addAuthHeaders = (request: any, accessToken = ACCESS_TOKEN) =>
    request.set('Content-Type', 'application/json')
           .set('x-api-key', API_KEY)
           .set('Authorization', `Bearer ${accessToken}`)
           .timeout(2000);
