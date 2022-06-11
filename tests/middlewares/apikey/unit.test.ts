import { API_KEY, mockFindApiKey } from '../../mock';
import app from '../../../src/app';
import supertest from 'supertest';

describe('apikey validation', () => {
  const endpoint = '/v1/dummy/test';
  const request = supertest(app);

  beforeEach(() => {
    mockFindApiKey.mockClear();
  });

  it('When x-api-key header is not passed, then it should response with 400 if ', async () => {
    const response = await request.get(endpoint).timeout(2000);
    expect(response.status).toBe(400);
    expect(mockFindApiKey).not.toBeCalled();
  });

  it('When wrong x-api-key header is passed, then it should response with 403', async () => {
    const wrongApiKey = '123';
    const response = await request.get(endpoint).set('x-api-key', wrongApiKey).timeout(2000);
    expect(response.status).toBe(403);
    expect(mockFindApiKey).toBeCalledTimes(1);
    expect(mockFindApiKey).toBeCalledWith(wrongApiKey);
  });

  it('When correct x-api-key header is passed and route is not handelled, then it should response with 404', async () => {
    const response = await request.get(endpoint).set('x-api-key', API_KEY).timeout(2000);
    expect(response.status).toBe(404);
    expect(mockFindApiKey).toBeCalledTimes(1);
    expect(mockFindApiKey).toBeCalledWith(API_KEY);
  });
});
