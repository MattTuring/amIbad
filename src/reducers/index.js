import { combineReducers } from 'redux';
import { summoner } from './summoner.js';
import { champ } from './champ.js';


const rootReducer = combineReducers({
  champ, summoner
});


export default rootReducer;
