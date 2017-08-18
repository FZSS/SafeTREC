import _ from 'underscore';
import PropTypes from 'prop-types';
import { concernsPropTypes } from './concernsReducer';
import actionTypes from '../constants/actionTypes';
import { ASPECT_RATIO } from '../constants/screen';

const LATITUDE_DELTA = 0.004;

const initialState = {
  userLocation: {
    latitude: 37.78825,
    longitude: -122.4324,
  },

  mapRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
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

export const mapPropTypes = {
  userLocation: PropTypes.shape({
    longitude: PropTypes.number,
    latitude: PropTypes.number,
  }),
  mapRegion: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  concernsInMapRegion: PropTypes.arrayOf(concernsPropTypes.concern),

};

export default function (state = initialState, action) {
  /* eslint prefer-template: 0 */
  switch (action.type) {
    case actionTypes.UpdateMapRegion:
      return {
        ...state,
        mapRegion: action.payload,
      };

    case actionTypes.UpdateUserLocation:
      return {
        ...state,
        userLocation: action.coordinates,
      };

    case actionTypes.GetConcernsInArea + '_FULFILLED': {
      const concernsInMapRegion = [];

      // Transform firebase date entry according to store schema
      Object.keys(action.payload).forEach((key) => {
        const newConcern = _.clone(action.payload[key]);
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

    case actionTypes.GetConcernsInArea + '_REJECTED':
      console.log(action.payload);
      return state;

    default:
      return state;
  }
}
