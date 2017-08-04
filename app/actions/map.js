import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';

export const getConcernsInRegion = (mapRegion) => {

  //TODO:rewrite so read actually concernsInArea but not all concerns
  const ref  = firebase.database().ref('concerns');

  // return {
  //   type: actionTypes.GetConcernsInArea,
  //   payload:  ref.orderByChild("latitude")
  //                 .startAt(mapRegion.latitude - latitudeDelta)
  //                 .endAt(mapRegion.latitude - latitudeDelta)
  //                 .limitToFirst(10).once('value')
  // }
  return {
    type: actionTypes.GetConcernsInArea,
    payload: ref.once('value').then(snapshot => {
      return snapshot.val();
    })
  }
};

export const updateMapRegion = (mapRegion) => {

  return {
    type: actionTypes.UpdateMapRegion,
    payload: mapRegion
  }
};

export const updateUserLocation = (coordinates) => {

  return {
    type: actionTypes.UpdateUserLocation,
    coordinates: coordinates
  }
};
