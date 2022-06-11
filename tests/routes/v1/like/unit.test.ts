import { 
    addAuthHeaders,
    mockUserFindById,
    mockJwtValidate,
    getAccessTokenSpy,
    mockFollowings,
    mockGetByUserId,
    user_tweet_1,
    mockLikeCreate,
    mockGetTweetById,
} from "../../../mock";

  
import app from '../../../../src/app';
import supertest from 'supertest';
import { Types } from "mongoose";
  
describe('Like Service', () => {
    const endpoint = '/v1/like/id/';
    const request = supertest(app);

    beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockFollowings.mockClear();
    mockGetByUserId.mockClear();
    mockLikeCreate.mockClear();
    mockGetTweetById.mockClear();
    });

    it('When logged-in user likes tweet, then it creates a like for tweet with 200 response', async () => {
    const response = await addAuthHeaders(request.post(endpoint + user_tweet_1._id));
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Tweet Liked/);
    expect(response.body.data).toBeDefined();
    expect(mockGetTweetById).toBeCalledTimes(1);
    expect(mockLikeCreate).toBeCalledTimes(1);
    });

    it('When tweet id is inavlid, then it returns error', async () => {
        const response = await addAuthHeaders(request.post(endpoint + new Types.ObjectId));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/Tweet does not exist/);
        expect(mockGetTweetById).toBeCalledTimes(1);
        expect(mockLikeCreate).toBeCalledTimes(0);
    });
  });