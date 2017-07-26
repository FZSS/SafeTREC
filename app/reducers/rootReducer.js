import { combineReducers } from 'redux';
import concerns from './concernsReducer';

const rootReducer = combineReducers({
  concerns
});

export default rootReducer;
