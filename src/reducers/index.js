import { combineReducers } from 'redux';
import { champ } from './champ.js';
import { summoner } from './summoner.js';


const rootReducer = combineReducers({
  champ, summoner
});


export default rootReducer;
