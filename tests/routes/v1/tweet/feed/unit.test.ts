import { 
    addAuthHeaders,
    mockUserFindById,
    mockJwtValidate,
    getAccessTokenSpy,
    mockFollowings,
    mockGetByUserId,
} from "../../../../mock";

  
import app from '../../../../../src/app';
import supertest from 'supertest';
  
describe('Feed Service - Fetch feed', () => {
  const endpoint = '/v1/feed/';
  const request = supertest(app);

  beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockFollowings.mockClear();
    mockGetByUserId.mockClear();
  });

  it('When logged-in user fetches tweet, then it returns feed with 200 response', async () => {
    const response = await addAuthHeaders(request.get(endpoint));
    console.log(response.body.data);
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/successfully/);
    expect(response.body.data).toBeDefined();
    expect(mockFollowings).toBeCalledTimes(1);
    expect(mockGetByUserId).toBeCalledTimes(2);
  });
  });