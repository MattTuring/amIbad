import { summoner } from './summoner.js';

describe('summoner reducer', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = summoner(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should return the correct state if the action is ADD_FAVORITE_CHAMP', () => {
    const initialState = []
    const action = {
      type: 'ADD_FAVORITE_SUMMONER',
        summoner: {summoner: 'test'}
    }
    const result = summoner(initialState, action);
    const expected = [{summoner: 'test'}];

    expect(result).toEqual(expected);
  })

});
