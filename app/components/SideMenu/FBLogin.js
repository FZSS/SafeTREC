import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import firebase from '../../config/firebase';
import {
  LoginButton,
  LoginManager,
  AccessToken
} from 'react-native-fbsdk';

class FBLogin extends Component{

  connectWithFirebase(error, result) {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          firebase
            .auth()
            .signInWithCredential(credential)
        }
      )
    }
  }

  disconnectWithFirebase() {
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log(error))
  }


  render () {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={this.connectWithFirebase}
          onLogoutFinished={this.disconnectWithFirebase}/>
      </View>
    );
  }
}

export default FBLogin;