import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import { uploadNewConcernImages } from './images';
import { GOOGLE_MAPS_JAVASCRIPT_API_KEY } from '../config/google-maps';
import geofire from '../config/geofire';
import types from '../constants/concernTypes';

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

  const concernsRef = firebase.database().ref().child('concerns');
  const newConcernId = concernsRef.push().key;

  const concern = {
    address: details.address,
    latitude: details.coordinate.latitude,
    longitude: details.coordinate.longitude,
    title: details.title,
    id: newConcernId,
    description: details.description,
    numberOfImages: images.length,
  };

  // add a list of promises to upload new concern images
  const promises = uploadNewConcernImages(newConcernId, images);

  // add the promise to set concern to the new ref
  promises.push(concernsRef.child(newConcernId).set(concern));

  // add the promise to set geohash in geofire
  const [lat, long] = [details.coordinate.latitude, details.coordinate.longitude];
  promises.push(geofire.set(newConcernId, [lat, long]));

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

  // add a promise to remove the concernNode
  promises.push(concernRef.remove());

  // add promises to delete all images
  for (let i = 0; i < numOfImages; i += 1) {
    promises.push(concernImagesRef.child(`image${i}`).delete());
  }

  // add a promise to remove the geofire entry
  promises.push(geofire.remove(concernId));

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

/**
 * Return the types of traffic safety concerns based on parameters
 * @param mode - Mode of Transportation
 * @param time - The Date object when the concern is created
 * @param coordinate - The coordinate of the concern
 */
/* eslint no-unused-vars: 1 */
export const updateConcernTypes = (mode, time, coordinate) => ({
  /* TODO: This not doing anything with parameters as of now but returning fixed
     types from constants/concernTypes. Should be updated to a server call that uses
     all the parameters to determine which types */
  type: actionTypes.UpdateConcernTypes,
  types,
});
