import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import axios from 'axios';

export const GET_CONCERNS_IN_AREA = () => {

};

export const uploadConcern = (details) => {

  //check connection TODO:DELETE
  const connectedRef = firebase.database().ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      console.log('connected')
    } else {
      console.log('not connected')
    }
  });

  let concern = {
    address: details.address,
    longitude: details.coordinate.longitude,
    latitude: details.coordinate.latitude,
    title: details.title,
    description: details.description
  };

  return {
    type: actionTypes.SubmitConcern,
    payload: firebase.database().ref().child('concerns').push().set(concern)
  }
};

export const getNewConcernAddressFromPictureGeocode = (latitude, longitude) => {

  let latlngString = latitude.toString() + ',' + longitude.toString();
  // let correct = '40.714224,-73.961452';
  // console.log(latlngString);

  let params = {
    key: 'AIzaSyApaQH7UAaP8f72yjI0xWaAnQTeq4s9JlU', //My google maps javascript api key
    latlng: latlngString ,
  };

  return {
    type: actionTypes.GetNewConcernAddressFromPictureGeocode,
    payload: axios.get('https://maps.googleapis.com/maps/api/geocode/json?', {
      params: params
    })
  }
};

export const updateNewConcernAddress = (address) => {

  return {
    type: actionTypes.UpdateNewConcernAddress,
    payload: address
  }
};

export const updateNewConcernCoordinates = (latitude, longitude) => {

  return {
    type: actionTypes.UpdateNewConcernCoordinates,
    payload: {
      latitude: latitude,
      longitude: longitude
    }
  }
};
