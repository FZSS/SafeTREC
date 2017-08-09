import { combineReducers } from 'redux';
import concerns from './concernsReducer';
import map from './mapReducer';
import images from './imagesReducer';

const rootReducer = combineReducers({
  concerns,
  map,
  images,
});

export default rootReducer;
