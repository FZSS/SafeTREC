import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import geofire from '../config/geofire';

const DEGREE_TO_KILO = 112;
const concernsRef = firebase.database().ref('concerns');

export const getConcernsInRegion = mapRegion => (dispatch) => {
  /* eslint no-unused-vars: 1 */
  console.log('Getting concern in region MapRegion:');
  console.log(mapRegion);

  // initialize a geoQuery with respect to current mapRegion
  const [lat, long] = [mapRegion.latitude, mapRegion.longitude];
  const radius = Math.max(mapRegion.latitudeDelta, mapRegion.longitudeDelta) * DEGREE_TO_KILO;
  const geoQuery = geofire.query({
    center: [lat, long],
    radius,
  });

  let getConcerns = [];
  const foundConcernIds = [];

  // If a key/concernId is in the region, the key will be added to foundConcernIds
  const onKeyEnteredRegistration = geoQuery.on('key_entered', (concernId) => {
    foundConcernIds.push(concernId);
    console.log(`geofire found ${concernId} in mapRegion`);
  });

  // Helper function that return a promise to read concerns/concernId's value from firebase
  const getConcern = concernId => concernsRef.child(concernId).once('value').then(snapshot => snapshot.val());

  // When all keys are read, dispatch a list of promises that return the concerns value
  geoQuery.on('ready', () => {
    onKeyEnteredRegistration.cancel(); // end the geoQuery
    getConcerns = foundConcernIds.map(getConcern);
    dispatch({
      type: actionTypes.GetConcernsInArea,
      payload: Promise.all(getConcerns),
    });
  });
};

export const updateMapRegion = mapRegion => ({
  type: actionTypes.UpdateMapRegion,
  payload: mapRegion,
});

export const updateUserLocation = coordinates => ({
  type: actionTypes.UpdateUserLocation,
  coordinates,
});
