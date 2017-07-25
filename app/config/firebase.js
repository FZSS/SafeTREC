import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAn0WD5ykdGJyzrNrqb0ZGwXZf-A9KHwvY",
  authDomain: "safetrec-1492129535589.firebaseapp.com",
  databaseURL: "https://safetrec-1492129535589.firebaseio.com",
  projectId: "safetrec-1492129535589",
  storageBucket: "safetrec-1492129535589.appspot.com",
  messagingSenderId: "998290779947"
};

firebase.initializeApp(firebaseConfig);

export default firebase;