import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';


export const resetNewConcernImages = () => {
  return {
    type: actionTypes.ResetNewConcernImages
  }
};

export const addANewConcernImage = (pictureData) => {
  return {
    type: actionTypes.AddANewConcernImage,
    payload: pictureData
  }
};

export const uploadNewConcernImages = () => {

};