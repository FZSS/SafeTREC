import _ from 'underscore';
import actionTypes from '../constants/actionTypes';

/* concern schema */
const initialState = {
  newConcern: {
    id: 'XDFJKSJK129JK',
    address: 'Address...',
    coordinate: {
      latitude: 37.78821,
      longitude: -122.4224,
    },
    numberOfImages: 1,
  },

  newConcernSubmissionStatus: {
    pending: false,
    success: false,
    failed: false,
  },

  concernDeleteStatus: {
    pending: false,
    success: false,
    failed: false,
  },

  concernsInMapRegion: [
    {
      id: 'XDFJKSJK129JK',
      address: null,
      coordinate: {
        latitude: 37.78821,
        longitude: -122.4224,
      },
      title: 'concern 0',
      description: 'a safety concern!',
      numberOfImages: 1,
    },
    {
      id: 'ADFJ2SJK129JK',
      address: null,
      coordinate: {
        latitude: 37.78721,
        longitude: -122.4124,
      },
      title: 'concern 1',
      description: 'another safety concern!',
      numberOfImages: 1,
    },
  ],
};

export default function (state = initialState, action) {
  /* eslint prefer-template: 0 */
  switch (action.type) {
    case actionTypes.SubmitConcern + '_PENDING':
      return {
        ...state,
        newConcernSubmissionStatus: {
          ...state.newConcernSubmissionStatus,
          pending: true,
        },
      };

    case actionTypes.SubmitConcern + '_FULFILLED':
      return {
        ...state,
        newConcernSubmissionStatus: {
          ...state.newConcernSubmissionStatus,
          pending: false,
          success: true,
        },
      };

    case actionTypes.SubmitConcern + '_REJECTED':
      return {
        ...state,
        newConcernSubmissionStatus: {
          ...state.newConcernSubmissionStatus,
          pending: false,
          failed: true,
        },
      };

    case actionTypes.DeleteConcern + '_PENDING':
      return {
        ...state,
        concernDeleteStatus: {
          ...state.concernDeleteStatus,
          pending: true,
        },
      };

    case actionTypes.DeleteConcern + '_FULFILLED':
      return {
        ...state,
        concernDeleteStatus: {
          ...state.concernDeleteStatus,
          pending: false,
          success: true,
        },
      };

    case actionTypes.DeleteConcern + '_REJECTED':
      return {
        ...state,
        concernDeleteStatus: {
          ...state.concernDeleteStatus,
          pending: false,
          failed: true,
        },
      };

    case actionTypes.GetConcernsInArea + '_FULFILLED': {
      const concernsInMapRegion = [];

      /* conforming database entry according to store scheme */
      Object.keys(action.payload).forEach((key) => {
        const newConcern = _.clone(action.payload[key]);
        newConcern.id = key;
        newConcern.coordinate = {
          longitude: newConcern.longitude,
          latitude: newConcern.latitude,
        };
        concernsInMapRegion.push(newConcern);
      });

      return {
        ...state,
        concernsInMapRegion,
      };
    }

    case actionTypes.UpdateNewConcernAddress: {
      return {
        ...state,
        newConcern: {
          ...state.newConcern,
          address: action.payload,
        },
      };
    }

    // case actionTypes.UpdateNewConcernAddressFromGeocode + '_REJECTED':
    //   return state;

    case actionTypes.UpdateNewConcernAddressFromGeocode + '_FULFILLED': {
      const address = action.payload.data.results[0].formatted_address;
      return {
        ...state,
        newConcern: {
          ...state.newConcern,
          address,
        },
      };
    }

    case actionTypes.UpdateNewConcernCoordinates:
      return {
        ...state,
        newConcern: {
          ...state.newConcern,
          coordinate: {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          },
        },
      };

    default:
      return state;
  }
}

