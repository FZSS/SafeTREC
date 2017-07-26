import actionTypes from '../constants/actionTypes';

//concern schema
const initialState = {
  newConcern: null,
  newConcernSubmissionStatus: {
    pending: false,
    success: false,
    failed: false,
  },
  concernsInMapRegion: [
    {
      id: 0,
      address: null,
      coordinate: {
        latitude: 37.78821,
        longitude: -122.4224,
      },
      title: 'concern 0',
      description: 'a safety concern!'},
    {
      id: 1,
      address: null,
      coordinate: {
        latitude: 37.78721,
        longitude: -122.4124,
      },
      title: 'concern 1',
      description: 'another safety concern!'},
  ]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SubmitConcern + '_PENDING':
      return {
        ...state,
        newConcernSubmissionStatus: {
          ...state.newConcernSubmissionStatus,
          pending: true
        },
      };

    case actionTypes.SubmitConcern + '_FULFILLED':
      return {
        ...state,
        newConcernSubmissionStatus: {
          ...state.newConcernSubmissionStatus,
          pending: false,
          success: true
        },
      };

    case actionTypes.SubmitConcern + '_REJECTED':
      return {
        ...state,
        newConcernSubmissionStatus: {
          ...state.newConcernSubmissionStatus,
          pending: false,
          failed: true
        },
      };

    default:
      return state;
  }
}

