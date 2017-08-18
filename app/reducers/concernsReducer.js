import _ from 'underscore';
import PropTypes from 'prop-types';
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
    description: '',
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
  concernTypes: ['', '', ''],
};

/**
 * Export propTypes of a store's important objects; Define store schema
 * @type {{imagePredictionStatus: *}}
 */
export const concernsPropTypes = {
  concern: PropTypes.shape({
    id: PropTypes.string,
    address: PropTypes.string,
    numberOfImages: PropTypes.number,
    description: PropTypes.string,
    coordinate: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    concernType: PropTypes.string,
    modeOfTransportation: PropTypes.string,
    title: PropTypes.string,
  }),

  concernDeleteStatus: PropTypes.shape({
    pending: PropTypes.bool,
    success: PropTypes.bool,
    failed: PropTypes.bool,
  }),

  newConcernSubmissionStatus: PropTypes.shape({
    pending: PropTypes.bool,
    success: PropTypes.bool,
    failed: PropTypes.bool,
  }),

  concernTypes: PropTypes.arrayOf(PropTypes.string),
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

    case actionTypes.UpdateNewConcernAddress: {
      return {
        ...state,
        newConcern: {
          ...state.newConcern,
          address: action.payload,
        },
      };
    }

    case actionTypes.UpdateNewConcernAddressFromGeocode + '_FULFILLED': {
      // if reverse geocode return no result
      if (action.payload.data.status === 'ZERO_RESULTS') {
        return {
          ...state,
          newConcern: {
            ...state.newConcern,
            address: 'No Address Found',
          },
        };
      }
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

    case actionTypes.UpdateConcernTypes:
      return {
        ...state,
        concernTypes: action.types,
      };

    default:
      return state;
  }
}

