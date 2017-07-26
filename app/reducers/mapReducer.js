import actionTypes from '../constants/actionTypes';

const initialState = {
  userPosition: {
    latitude: 37.78825,
    longitude: -122.4324,
  },
  mapRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.UpdateMapRegion:
      return {
        ...state,
        mapRegion: action.payload
      }
  }
}