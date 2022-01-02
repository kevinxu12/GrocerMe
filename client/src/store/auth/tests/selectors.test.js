import { makeSelectUsername } from '../selectors';

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = {
      auth: {
        username,
      },
    };
    expect(usernameSelector(mockedState)).toEqual(username);
  });
});
