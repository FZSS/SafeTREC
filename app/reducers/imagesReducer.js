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

  imagePredictionStatus: {
    pending: false,
    success: false,
    failed: false,
  },

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

    case actionTypes.GetImagePredictions + '_PENDING':
      return {
        ...state,
        imagePredictionStatus: {
          pending: true,
        },
      };

    case actionTypes.GetImagePredictions + '_FULFILLED': {
      let predictions = action.payload.data.responses[0].labelAnnotations;

      // reject predictions that have low prediction score
      predictions = _.reject(predictions, prediction => prediction.score < 0.8);

      return {
        ...state,
        newConcernImagePredictions: predictions,
        imagePredictionStatus: {
          pending: false,
          success: true,
        },
      };
    }

    case actionTypes.GetImagePredictions + '_REJECTED':
      return {
        ...state,
        newConcernImagePredictions: [],
        imagePredictionStatus: {
          pending: false,
          failed: true,
        },
      };

    default:
      return state;
  }
}
