import { backEndApi } from './back-end-api.js';

describe('backEndApi', () => {
  it('should work', () => {
    expect(backEndApi()).toEqual('back-end-api');
  });
});
