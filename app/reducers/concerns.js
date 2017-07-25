import actionTypes from '../constants/actionTypes';

function concernReducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.UploadConcern:
      return state;

    default:
      return state;
  }
}