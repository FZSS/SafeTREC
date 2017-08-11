import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import { uploadNewConcernImages } from './images';
import { GOOGLE_MAPS_JAVASCRIPT_API_KEY } from '../config/google-maps';

export const uploadConcern = (details, images) => {
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

  // Get a list of promises to upload new concern images
  const promises = uploadNewConcernImages(newConcernId, images);

  // Push the promise to set concern to the new ref to the list
  promises.push(concernsRef.child(newConcernId).set(concern));

  return {
    type: actionTypes.SubmitConcern,
    payload: Promise.all(promises),
  };
};

export const deleteConcern = (concernId, numOfImages = 0) => {
  console.log(`Deleting concern: ${concernId}`);
  const promises = [];
  const concernRef = firebase.database().ref(`concerns/${concernId}`);
  const concernImagesRef = firebase.storage().ref(`images/${concernId}`);

  promises.push(concernRef.remove());

  for (let i = 0; i < numOfImages; i += 1) {
    promises.push(concernImagesRef.child(`image${i}`).delete());
  }

  return {
    type: actionTypes.DeleteConcern,
    payload: Promise.all(promises),
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
