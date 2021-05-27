import { apiCaller } from '../services/apiCalls';

describe('Example test', () => {
  it('should pass', async () => {
    expect(2 == 2).toEqual(true);
    expect(await apiCaller({ url: '/', method: 'GET', data: {} })).toEqual({});
  });
});