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
};

export default function (state = initialState, action) {
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

    default:
      return state;
  }
}
