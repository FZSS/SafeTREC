import _ from 'underscore';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase-config';
import geofire from '../config/geofire-config';

const DEGREE_TO_KILO = 112;
const concernsRef = firebase.database().ref('concerns');

/**
 * Get all concerns in map region.
 * @param mapRegion
 */
export const getConcernsInRegion = mapRegion => (dispatch) => {
  // a temp fix to a react-native-maps bug
  const region = _.clone(mapRegion);
  region.longitude = (region.longitude < 180) ? region.longitude : region.longitude - 360;

  // console.log('Getting concern in region MapRegion:');
  // console.log(region);

  /* initialize a geoQuery with respect to current region */
  const [lat, long] = [region.latitude, region.longitude];
  const radius = Math.max(region.latitudeDelta, region.longitudeDelta) * DEGREE_TO_KILO;
  const geoQuery = geofire.query({
    center: [lat, long],
    radius,
  });

  let getConcerns = []; // a list of requests to get concerns
  const concernIdsInRegion = [];

  /* if a key/concernId is in the region, add to concernIdsInRegion */
  const onKeyEnteredRegistration = geoQuery.on('key_entered', (concernId) => {
    concernIdsInRegion.push(concernId);
    console.log(`geofire found ${concernId} in mapRegion`);
  });

  /* a helper function that returns a promise to read concerns/concernId's value from firebase */
  const getConcern = concernId => concernsRef.child(concernId).once('value').then(snapshot => snapshot.val());

  /* when geoquery is finished, dispatch a list of promises that return the concerns */
  geoQuery.on('ready', () => {
    onKeyEnteredRegistration.cancel(); // end the geoQuery
    getConcerns = concernIdsInRegion.map(getConcern);
    dispatch({
      type: actionTypes.GetConcernsInArea,
      payload: Promise.all(getConcerns),
    });
  });
};

/**
 * Return an action to update map region in redux store.
 * @param mapRegion
 */
export const updateMapRegion = mapRegion => ({
  type: actionTypes.UpdateMapRegion,
  payload: mapRegion,
});

/**
 *  Return the UpdateMapRegion action with a temp fix to a react-native-maps bug
 *  where onRegionChange return a mapRegion with longitude > 180 sometimes
 *  Should only be used with onRegionChange
 */
export const updateMapRegionWithFix = (mapRegion) => {
  const fixedMapRegion = mapRegion;
  fixedMapRegion.longitude = (fixedMapRegion.longitude < 180) ?
    fixedMapRegion.longitude : fixedMapRegion.longitude - 360;
  return {
    type: actionTypes.UpdateMapRegion,
    payload: fixedMapRegion,
  };
};

/**
 * Return an action to update the user location in redux store.
 * @param coordinates
 */
export const updateUserLocation = coordinates => ({
  type: actionTypes.UpdateUserLocation,
  coordinates,
});
