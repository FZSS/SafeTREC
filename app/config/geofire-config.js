import Geofire from 'geofire';
import firebase from './firebase-config';

const geofire = new Geofire(firebase.database().ref('geofire'));
export default geofire;
