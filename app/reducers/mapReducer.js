import actionTypes from '../constants/actionTypes';

const initialState = {
  userLocation: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  mapRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0082,
    longitudeDelta: 0.0121,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UpdateMapRegion:
      return {
        ...state,
        mapRegion: action.payload
      };

    case actionTypes.UpdateUserLocation:
      return {
        ...state,
        userLocation: action.coordinates
      };

    default:
      return state
  }
}