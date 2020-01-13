import { champ } from './champ.js';

describe('champ reducer', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = champ(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the correct state if the action is ADD_FAVORITE_CHAMP', () => {
    const initialState = []
    const action = {
      type: 'ADD_FAVORITE_CHAMP',
        champ: {champ: 'test'}
    }
    const result = champ(initialState, action);
    const expected = [{champ: 'test'}];

    expect(result).toEqual(expected);
  })

});
