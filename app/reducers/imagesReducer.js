import actionTypes from '../constants/actionTypes';
import _ from 'underscore';

const initialState = {
  newConcernImages : [{
      key: 'placeholder',
      uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg',
      location: {
        latitude: 37.78721,
        longitude: -122.4124,
      }
  }],

  newConcernImagesUploadStatus: {
    pending: false,
    success: false,
    failed: false,
  },

  concernImages: {

  }
};

export default function (state = initialState, action) {
  switch (action.type) {

    case actionTypes.ResetNewConcernImages:
      return {
        ...state,
        newConcernImages: initialState.newConcernImages
      };

    case actionTypes.AddANewConcernImage:

      // if the first image is placeholder, clear it
      let newImageArray = [];
      if (state.newConcernImages[0].key !== 'placeholder') {
        newImageArray = _.clone(state.newConcernImages);
      }
      newImageArray.push(action.payload);

      return {
        ...state,
        newConcernImages: newImageArray
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

    default:
      return state
  }
}