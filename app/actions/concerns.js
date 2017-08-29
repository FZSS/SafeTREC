import axios from 'axios';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import { uploadNewConcernImages } from './images';
import { GOOGLE_MAPS_JAVASCRIPT_API_KEY } from '../config/google-maps';
import geofire from '../config/geofire';
import types from '../constants/concernTypes';

/**
 * Submit a concern: Return an action SUBMIT_CONCERN with promises to upload
 * to firebase all concern images, concern data and geofire.
 * @param details
 * @param images
 * @return {{type: string, payload: Promise.<*[]>}}
 */
export const submitConcern = (details, images) => {

  const concernsRef = firebase.database().ref('concerns');
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

/**
 * Return an action DELETE_CONCERN with promises to delete the concern entry,
 * concern images and geofire entry in firebase.
 * @param concernId
 * @param numOfImages
 * @return {{type: string, payload: Promise.<*[]>}}
 */
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

/**
 * Return an action UPDATE_ADDRESS_FROM_GEOCODE with a promise to look up
 * address information of the given coordinates using Google Geocode API.
 * @param latitude
 * @param longitude
 * @return {{type: string, payload: AxiosPromise}}
 */
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

/**
 * Return an action UPDATE_NEW_CONCERN_ADDRESS to update
 * the new concern address.
 * @param address
 */
export const updateNewConcernAddress = address => ({
  type: actionTypes.UpdateNewConcernAddress,
  payload: address,
});

/**
 * Return an action UPDATE_NEW_CONCERN_COORDINATES to update
 * the new concern coordinates.
 * @param latitude
 * @param longitude
 */

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
