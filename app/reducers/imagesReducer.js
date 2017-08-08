import actionTypes from '../constants/actionTypes';
import _ from 'underscore';

const initialState = {

  newConcernImages : [],
  newConcernImagesUploadStatus: {
    pending: false,
    success: false,
    failed: false,
  },
  newConcernImagesPredication: [],

  concernImages: [],
  concernImagesPending: false
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.ResetNewConcernImages:
      return {
        ...state,
        newConcernImages: initialState.newConcernImages
      };

    case actionTypes.AddANewConcernImage:

      let newImageArray = _.clone(state.newConcernImages);
      newImageArray.push(action.payload);

      return {
        ...state,
        newConcernImages: newImageArray
      };

    case actionTypes.DeleteANewConcernImage:

      const keyToDelete = action.key;

      let newImages = _.reject(_.clone(state.newConcernImages), image => {
        return image.key === keyToDelete;
      });

      console.log(newImages);

      return {
        ...state,
        newConcernImages: newImages
      };


    case actionTypes.UploadNewConcernImages + '_PENDING':
      return {
        ...state,
        newConcernImagesUploadStatus: {
          pending: true,
          success: false,
          failed: false
        }
      };

    case actionTypes.UploadNewConcernImages + '_FULFILLED':
      return {
        ...state,
        newConcernImagesUploadStatus: {
          pending: false,
          success: true,
          failed: false
        },
      };

    case actionTypes.UploadNewConcernImages + '_REJECTED':
      return {
        ...state,
        newConcernImagesUploadStatus: {
          pending: false,
          success: false,
          failed: true
        },
      };

    case actionTypes.GetConcernImages + '_PENDING':

      return {
        ...state,
        concernImagesPending: true
      };

    case actionTypes.GetConcernImages + '_FULFILLED':

      return {
        ...state,
        concernImages: action.payload,
        concernImagesPending: false
      };

    case actionTypes.GetConcernImages + '_REJECTED':

      return {
        ...state,
        concernImages: [],
        concernImagesPending: false
      };

    case actionTypes.GetImagePredictions + '_REJECTED':
      console.log(action.payload);
      return state;

    case actionTypes.GetImagePredictions + '_FULFILLED':
      console.log(action.payload.outputs.concepts);
      return state;

    default:
      return state
  }
}