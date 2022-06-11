import {
    addAuthHeaders,
    mockUserFindById,
    mockJwtValidate,
    getAccessTokenSpy,
    mockGetProfileDetails,
} from "../../../mock";

  
import app from '../../../../src/app';
import supertest from 'supertest';


describe('Profile Service', () => {
const endpoint = '/v1/profile/my';
const request = supertest(app);

beforeEach(() => {
    getAccessTokenSpy.mockClear();
    mockJwtValidate.mockClear();
    mockUserFindById.mockClear();
    mockGetProfileDetails.mockClear();
});

it('When logged-in user fetches profile information, then it returns the profile details with 200 response', async () => {
    const response = await addAuthHeaders(request.get(endpoint));
    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/successfully/);
    expect(response.body.data).toBeDefined();
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('username');
    expect(mockGetProfileDetails).toBeCalledTimes(1);
    });
});
  
