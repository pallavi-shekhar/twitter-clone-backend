import { 
    addAuthHeaders,
    mockUserFindById,
    mockJwtValidate,
    getAccessTokenSpy,
    mockTweetCreate,
    TWEET_ID,
    mockGetTweetById,
    mockGetByUserId,
    USER_ID_ON_BEHALF,
    mockGetByUser,
} from "../../../../mock";

  
import app from '../../../../../src/app';
import supertest from 'supertest';
import { Types } from "mongoose";
  
describe('Tweet Service - Create Tweet', () => {
  const endpoint = '/v1/tweet/';
  const request = supertest(app);

  beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockTweetCreate.mockClear();
  });

  it('When user creates tweet, then it returns created tweet', async () => {
    const response = await addAuthHeaders(
    request.post(endpoint).send({
        content: 'My Tweet',
        imageUrl: 'https://abc.com/xyz',
      })
    );

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/successfully/);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('content');
    expect(response.body.data).toMatchObject({ _id: TWEET_ID.toHexString() });
    expect(mockTweetCreate).toBeCalledTimes(1);
    });

    it('When user does not provide content, then it returns error', async () => {
      const response = await addAuthHeaders(
      request.post(endpoint).send({
          imageUrl: 'https://abc.com/xyz',
        }));

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/content is required/);
      expect(mockTweetCreate).toBeCalledTimes(0);
      });
  });

describe('Tweet Service - Get Tweet By Id', () => {
  const endpoint = '/v1/tweet/id/';
  const request = supertest(app);

  beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockTweetCreate.mockClear();
    mockGetTweetById.mockClear();
  });

  it('When valid tweet id is provided, then it returns the tweet', async () => {
    const response = await addAuthHeaders(request.get(endpoint + TWEET_ID));
      expect(response.status).toBe(200);
      expect(response.body.message).toMatch(/successfully/);
      expect(response.body.data).toBeDefined();
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('content');
      expect(mockGetTweetById).toBeCalledTimes(1);
    });

    it('When user gives an invalid tweet, it returns 400 error with message tweet does not exist', async () => {
      const response = await addAuthHeaders(request.get(endpoint + new Types.ObjectId()));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/does not exist/);
        expect(mockGetTweetById).toBeCalledTimes(1);
      });
  });

  describe('Tweet Service - Get Tweets of User By UserId', () => {
    const endpoint = '/v1/tweet/user/id/';
    const request = supertest(app);

    beforeEach(() => {
      getAccessTokenSpy.mockClear();
      mockJwtValidate.mockClear();
      mockUserFindById.mockClear();
      mockTweetCreate.mockClear();
      mockGetTweetById.mockClear();
      mockGetByUserId.mockClear();
    });

    it('When valid user id is provided, then it returns the tweets of user', async () => {
      const response = await addAuthHeaders(request.get(endpoint + USER_ID_ON_BEHALF));
        expect(response.status).toBe(200);
        expect(response.body.message).toMatch(/successfully/);
        expect(response.body.data).toBeDefined();
        expect(mockGetByUserId).toBeCalledTimes(1);
      });

    it('When invalid user id is provided, it returns 400 error with message user does not exist', async () => {
      const response = await addAuthHeaders(request.get(endpoint + new Types.ObjectId()));
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/does not exist/);
      expect(mockGetByUserId).not.toBeCalled();
      });
});

describe('Tweet Service - Get Logged-In User Tweets', () => {
  const endpoint = '/v1/tweet/my';
  const request = supertest(app);

  beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockTweetCreate.mockClear();
    mockGetTweetById.mockClear();
    mockGetByUserId.mockClear();
    mockGetByUser.mockClear();
  });

  it('When logged-in user fetches tweets, then it returns the tweets of logged-in user', async () => {
    const response = await addAuthHeaders(request.get(endpoint));
      expect(response.status).toBe(200);
      expect(response.body.message).toMatch(/successfully/);
      expect(response.body.data).toBeDefined();
      expect(mockGetByUser).toBeCalledTimes(1);
  });
});



  

