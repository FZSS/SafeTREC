import { combineReducers } from 'redux';
import concerns from './concernsReducer';
import map from './mapReducer';

const rootReducer = combineReducers({
  concerns,
  map
});

export default rootReducer;
