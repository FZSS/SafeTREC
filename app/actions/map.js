import _ from 'underscore';
import actionTypes from '../constants/actionTypes';
import firebase from '../config/firebase';
import geofire from '../config/geofire';

const DEGREE_TO_KILO = 112;
const concernsRef = firebase.database().ref('concerns');

export const getConcernsInRegion = mapRegion => (dispatch) => {
  // a temp fix to a react-native-maps bug
  const region = _.clone(mapRegion);
  region.longitude = (region.longitude < 180) ? region.longitude : region.longitude - 360;

  // console.log('Getting concern in region MapRegion:');
  // console.log(region);

  // initialize a geoQuery with respect to current region
  const [lat, long] = [region.latitude, region.longitude];
  const radius = Math.max(region.latitudeDelta, region.longitudeDelta) * DEGREE_TO_KILO;
  const geoQuery = geofire.query({
    center: [lat, long],
    radius,
  });

  let getConcerns = [];
  const foundConcernIds = [];

  // if a key/concernId is in the region, the key will be added to foundConcernIds
  const onKeyEnteredRegistration = geoQuery.on('key_entered', (concernId) => {
    foundConcernIds.push(concernId);
    console.log(`geofire found ${concernId} in mapRegion`);
  });

  // helper function that return a promise to read concerns/concernId's value from firebase
  const getConcern = concernId => concernsRef.child(concernId).once('value').then(snapshot => snapshot.val());

  // when all keys are read, dispatch a list of promises that return the concerns value
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

/**
 *  UpdateMapRegion action with a temp fix to a react-native-maps bug
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

export const updateUserLocation = coordinates => ({
  type: actionTypes.UpdateUserLocation,
  coordinates,
});
