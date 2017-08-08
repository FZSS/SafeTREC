import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import axios from 'axios';
import { uploadNewConcernImages } from './images'

export const uploadConcern = (details, images) => {
  return dispatch => {

    //check connection TODO:DELETE
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', function(snap) {
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
      description: details.description,
      numberOfImages: images.length
    };

    const concernsRef = firebase.database().ref().child('concerns');
    const newConcernId = concernsRef.push().key;

    dispatch (uploadNewConcernImages(newConcernId, images));

    dispatch ({
      type: actionTypes.SubmitConcern,
      payload: concernsRef.child(newConcernId).set(concern)
    });
  }

};

export const deleteConcern = (concernId) => {
  const concernRef = firebase.database().ref(`concerns/${concernId}`);
  //FIXME: firebase storage does not support deleting directory, this is not working, need to delete 1 by 1
  const concernImagesRef = firebase.storage().ref(`images/${concernId}`);

  return {
    type: actionTypes.DeleteConcern,
    payload: new Promise.all([concernRef.remove(), concernImagesRef.delete()])
  };

};

export const updateNewConcernAddressFromGeocode = (latitude, longitude) => {

  let latlngString = latitude.toString() + ',' + longitude.toString();
  let params = {
    key: 'AIzaSyApaQH7UAaP8f72yjI0xWaAnQTeq4s9JlU', //My google maps javascript api key
    latlng: latlngString ,
  };

  return {
    type: actionTypes.UpdateNewConcernAddressFromGeocode,
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
