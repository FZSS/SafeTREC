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
      id: "XDFJKSJK129JK",
      address: null,
      coordinate: {
        latitude: 37.78821,
        longitude: -122.4224,
      },
      title: 'concern 0',
      description: 'a safety concern!'
    },
    {
      id: "ADFJ2SJK129JK",
      address: null,
      coordinate: {
        latitude: 37.78721,
        longitude: -122.4124,
      },
      title: 'concern 1',
      description: 'another safety concern!'
    },
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


    case actionTypes.GetConcernsInArea + '_FULFILLED':
      const concernsInMapRegion = [];

      // conforming database entry according to store scheme
      for (const key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          let newConcern = action.payload[key]; //TODO: use three dots
          newConcern.id = key;

          newConcern.coordinate = {
            longitude: newConcern.longitude,
            latitude: newConcern.latitude
          };
          concernsInMapRegion.push(newConcern);
        }
      }

      return {
        ...state,
        concernsInMapRegion
      };

    default:
      return state;
  }
}

