import _ from 'underscore';
import actionTypes from '../constants/actionTypes';

/**
 *  predication_example = {
 *    description: "flower",
 *    mid: "/m/0c9ph5",
 *    score: 0.91282445
 *  };
 */
const initialState = {
  newConcernImages: [],
  newConcernImagePredictions: [],
  concernImages: [],
  concernImagesPending: false,
};

export default function (state = initialState, action) {
  /* eslint prefer-template: 0 */
  switch (action.type) {
    case actionTypes.ResetNewConcernImages:
      return {
        ...state,
        newConcernImages: initialState.newConcernImages,
        newConcernImagePredictions: initialState.newConcernImagePredictions,
      };

    case actionTypes.AddANewConcernImage: {
      const newImageArray = _.clone(state.newConcernImages);
      newImageArray.push(action.payload);

      return {
        ...state,
        newConcernImages: newImageArray,
      };
    }

    case actionTypes.DeleteANewConcernImage: {
      const keyToDelete = action.key;
      const rejectImageKey = image => image.key === keyToDelete;
      const newImages = _.reject(_.clone(state.newConcernImages), rejectImageKey);

      return {
        ...state,
        newConcernImages: newImages,
      };
    }

    case actionTypes.GetConcernImages + '_PENDING':

      return {
        ...state,
        concernImagesPending: true,
      };

    case actionTypes.GetConcernImages + '_FULFILLED':

      return {
        ...state,
        concernImages: action.payload,
        concernImagesPending: false,
      };

    case actionTypes.GetConcernImages + '_REJECTED':

      return {
        ...state,
        concernImages: [],
        concernImagesPending: false,
      };

    case actionTypes.GetImagePredictions + '_REJECTED':
      return state;

    case actionTypes.GetImagePredictions + '_FULFILLED': {
      const predictions = action.payload.data.responses[0].labelAnnotations;
      return {
        ...state,
        newConcernImagePredictions: predictions,
      };
    }

    default:
      return state;
  }
}
