import actionTypes from '../constants/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case actionTypes.UploadConcern:
      return state;

    default:
      return state;
  }
}

