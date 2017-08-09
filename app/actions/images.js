import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import _ from 'underscore';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import clarifai from '../config/clarifai';
import { uriBase, subscriptionKey } from '../config/microsoft-vision';
import { visionURL } from '../config/google-vision';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export const getImagePredictions = (image) => {

  const uploadUri = image.uri.replace('file://', '');

  // Clarifai fails with process.nextTick undefined
  const getFileAndGetPredictionsWithClarifai = () => {
    return RNFetchBlob.fs.readFile(uploadUri, 'base64')
      .then( data => {
        return clarifai.models.predict(Clarifai.GENERAL_MODEL, {base64: data}) //Polyfill issue
      });
  };

  // https://dev.projectoxford.ai/docs/services/56f91f2d778daf23d8ec6739/operations/56f91f2e778daf14a499e1ff
  // fails with weird response
  const tagImageWithMircosoft = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        RNFetchBlob.fs.readFile(uploadUri, 'base64')
          .then(data => {
            return axios.create({
              method: 'post',
              url: uriBase + '/tag',
              headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': subscriptionKey
              },
              data: data
            })
          })
          .then(res => resolve(res))
          .catch( e => reject(e))
      }, 0)
    })
  };

  const predictWithGoogleVision = () => {
    return RNFetchBlob.fs.readFile(uploadUri, 'base64')
      .then(data => {

        return axios.post(visionURL, {
        'requests':[
          {
            'image':{
              'content': data
            },
            'features':[
              {
                'type':'LABEL_DETECTION',
              }
            ]
          }
        ]
      })
      })
  };

  return {
    type: actionTypes.GetImagePredictions,
    payload: predictWithGoogleVision()
  }
};

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

/**
 * Return an action that upload all images in the concern
 * @param concernId
 * @param images
 * @returns {{type: string, payload: Promise.all}}
 */
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

  return new Promise((resolve, reject) => {
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