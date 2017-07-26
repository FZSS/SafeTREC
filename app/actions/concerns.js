import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';

export const GET_CONCERNS_IN_AREA = () => {

};

export const uploadConcern = (details) => {

  //check connection DELETE
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


