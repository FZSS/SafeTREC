import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'

export default class SideMenu extends Component {

  render() {

    return (
      <View style={styles.container}>

        <Text style={styles.title}>Side Menu</Text>

        <Login />
        <TouchableOpacity >
          <Text style={styles.button}>Replace Tab#2 Root</Text>
        </TouchableOpacity>

        <TouchableOpacity >
          <Text style={styles.button}>Replace Tab#2 Root</Text>
        </TouchableOpacity>

        <TouchableOpacity >
          <Text style={styles.button}>Replace Tab#2 Root</Text>
        </TouchableOpacity>
      </View>
   )
  }
}


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;

class Login extends Component{
  render () {
    return (
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
};
