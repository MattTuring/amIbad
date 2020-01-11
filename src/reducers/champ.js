export const champ = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FAVORITE_CHAMP':
      return [...state, ...action.champ];
    default:
      return state;
  }
}
