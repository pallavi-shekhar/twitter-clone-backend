import { 
    addAuthHeaders,
    mockUserFindById,
    mockJwtValidate,
    getAccessTokenSpy,
    mockFollowings,
    mockGetByUserId,
    mockLikeCreate,
    mockGetTweetById,
    mockFollowCreate,
    USER_ID_ON_BEHALF,
    USER_ID,
} from "../../../../mock";

  
import app from '../../../../../src/app';
import supertest from 'supertest';
  
describe('Follow Service', () => {
   const endpoint = '/v1/follow/id/';
   const request = supertest(app);

    beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockFollowings.mockClear();
    mockGetByUserId.mockClear();
    mockLikeCreate.mockClear();
    mockGetTweetById.mockClear();
    mockFollowCreate.mockClear();
    });

    it('When logged-in user follows someone, then it creates a follow for user with 200 response', async () => {
    const response = await addAuthHeaders(request.post(endpoint + USER_ID_ON_BEHALF));
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/created successfully/);
    expect(response.body.data).toBeDefined();
    expect(mockFollowCreate).toBeCalledTimes(1);
    });

    it('When user follows itself, then it returns error with 400 response', async () => {
        const response = await addAuthHeaders(request.post(endpoint + USER_ID));
        expect(response.status).toBe(400);
        expect(response.body.message).toMatch(/Following self is not allowed/);
        expect(mockFollowCreate).toBeCalledTimes(0);
    });
  });