import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import _ from 'underscore';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

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

export const deleteANewConcernImage = imageKey => {
  return {
    type: actionTypes.DeleteANewConcernImage,
    key: imageKey
  }
};

export const uploadNewConcernImages = (concernId, images) => {
  const concernRef = firebase.storage().ref('images').child(concernId.toString());

  let uploadPictureList = _.map(images, (image, key) => {
    return uploadOneImage(image, concernRef, key, 'image/png;');
  });

  return {
    type: actionTypes.UploadNewConcernImages,
    payload: new Promise.all(uploadPictureList)
  }
};

/**
 * Return a promise to upload one image to firebase
 * @param image
 * @param concernRef
 * @param key
 * @param mime
 * @returns {Promise}
 */
const uploadOneImage = (image, concernRef, key, mime='application/octet-stream') => {
  const uploadUri = image.uri.replace('file://', '');
  const ref = concernRef.child('image' + key.toString());

  return new Promise ((resolve, reject) => {
    setTimeout( () => {
      RNFetchBlob.fs.readFile(uploadUri, 'base64')
        .then( data => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then( blob => {
          return ref.put(blob, { contentType: mime })
        })
        .then( () => {
          return ref.getDownloadURL();
        })
        .then( url => {
          console.log(url);
          resolve(url);
        })
        .catch( e => reject(e))
    }, 0);
  })
};

export const getConcernImages = (concernId, numberOfImages) => {

  let promiseList = [];
  const concernRef = firebase.storage().ref(`images/${concernId}`);

  for (let i = 0; i < numberOfImages; i += 1) {
    let downloadPromise = concernRef.child(`image${i}`).getDownloadURL()
      .then( url => {
        return {
          key: i,
          uri: url
        }
      });
    promiseList.push(downloadPromise)
  }

  return {
    type: actionTypes.GetConcernImages,
    payload: new Promise.all(promiseList)
  }

};