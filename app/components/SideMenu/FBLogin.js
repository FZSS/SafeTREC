import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  LoginButton,
  AccessToken,
} from 'react-native-fbsdk';
import styles from './styles';
import firebase from '../../config/firebase-config';

class FBLogin extends Component {
  static connectWithFirebase(error, result) {
    if (error) {
      alert(`login has error: ${result.error}`);
    } else if (result.isCancelled) {
      alert('login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          firebase
            .auth()
            .signInWithCredential(credential);
        },
      );
    }
  }

  static disconnectWithFirebase() {
    firebase
      .auth()
      .signOut()
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={['publish_actions']}
          onLoginFinished={FBLogin.connectWithFirebase}
          onLogoutFinished={FBLogin.disconnectWithFirebase}
        />
      </View>
    );
  }
}

export default FBLogin;
