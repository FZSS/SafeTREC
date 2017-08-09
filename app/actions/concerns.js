import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import { uploadNewConcernImages } from './images';
import { GOOGLE_MAPS_JAVASCRIPT_API_KEY } from '../config/google-maps';

export const uploadConcern = (details, images) => (dispatch) => {
  // check connection TODO:DELETE
  const connectedRef = firebase.database().ref('.info/connected');
  connectedRef.on('value', (snap) => {
    if (snap.val() === true) {
      console.log('connected');
    } else {
      console.log('not connected');
    }
  });

  const concern = {
    address: details.address,
    longitude: details.coordinate.longitude,
    latitude: details.coordinate.latitude,
    title: details.title,
    description: details.description,
    numberOfImages: images.length,
  };

  const concernsRef = firebase.database().ref().child('concerns');
  const newConcernId = concernsRef.push().key;

  dispatch(uploadNewConcernImages(newConcernId, images));

  dispatch({
    type: actionTypes.SubmitConcern,
    payload: concernsRef.child(newConcernId).set(concern),
  });
};

export const deleteConcern = (concernId) => {
  const concernRef = firebase.database().ref(`concerns/${concernId}`);
  // FIXME: not working: firebase storage does not support deleting directory, need to delete 1 by 1
  const concernImagesRef = firebase.storage().ref(`images/${concernId}`);

  return {
    type: actionTypes.DeleteConcern,
    payload: Promise.all([concernRef.remove(), concernImagesRef.delete()]),
  };
};

export const updateNewConcernAddressFromGeocode = (latitude, longitude) => {
  const latlngString = `${latitude.toString()},${longitude.toString()}`;
  const params = {
    key: GOOGLE_MAPS_JAVASCRIPT_API_KEY, // My google maps javascript api key
    latlng: latlngString,
  };

  return {
    type: actionTypes.UpdateNewConcernAddressFromGeocode,
    payload: axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params,
    }),
  };
};

export const updateNewConcernAddress = address => ({
  type: actionTypes.UpdateNewConcernAddress,
  payload: address,
});

export const updateNewConcernCoordinates = (latitude, longitude) => ({
  type: actionTypes.UpdateNewConcernCoordinates,
  payload: {
    latitude,
    longitude,
  },
});
