import actionTypes from '../constants/actionTypes';
import _ from 'underscore';

const initialState = {
  newConcernImages : [{
      key: 'XDFJKSJK129JK',
      uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg',
      location: {
        latitude: 37.78721,
        longitude: -122.4124,
      }
  }],

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
      let newImageArray = _.clone(state.newConcernImages);
      newImageArray.push(action.payload);

      return {
        ...state,
        newConcernImages: newImageArray
      };

    default:
      return state
  }
}