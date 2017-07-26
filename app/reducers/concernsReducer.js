import actionTypes from '../constants/actionTypes';

//concern schema
const initialState = {
  concerns: [
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
    case actionTypes.UploadConcern:
      return state;

    case actionTypes.GetConcernsInArea:
      return state;

    default:
      return state;
  }
}

