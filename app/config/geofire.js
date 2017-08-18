import Geofire from 'geofire';
import firebase from './firebase';

const geofire = new Geofire(firebase.database().ref('geofire'));
export default geofire;
