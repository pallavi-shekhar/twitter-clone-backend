import { 
    addAuthHeaders,
    mockUserFindById,
    mockJwtValidate,
    getAccessTokenSpy,
    mockFollowings,
} from "../../../../mock";

  
import app from '../../../../../src/app';
import supertest from 'supertest';
  
describe('Follow Service - Followings', () => {
    const endpoint = '/v1/followings/my';
    const request = supertest(app);

    beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockFollowings.mockClear();
    });

    it('When logged-in user fetches followings, then it returns followings with 200 response', async () => {
    const response = await addAuthHeaders(request.get(endpoint));
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Followings List/);
    expect(response.body.data).toBeDefined();
    expect(mockFollowings).toBeCalledTimes(1);
    });
  });