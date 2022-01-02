import { initialState } from 'store/auth/reducer';
import { configureAppStore } from '../configureStore';

describe('configureStore', () => {
  it('should return a store with injected enhancers', () => {
    const store = configureAppStore();
    expect(store).toEqual(
      expect.objectContaining({
        dispatch: expect.any(Function),
        getState: expect.any(Function),
        replaceReducer: expect.any(Function),
        subscribe: expect.any(Function),
      }),
    );
  });

  it('should return an empty store', () => {
    const store = configureAppStore();
    const state = { auth: initialState };
    expect(store.getState()).toEqual(state);
  });
});
