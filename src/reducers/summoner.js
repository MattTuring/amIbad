export const summoner = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE_SUMMONER':
      return [...state, action.summoner];
    default:
      return state;
  }
}
