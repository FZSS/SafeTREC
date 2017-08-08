import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import FBLogin from './FBLogin';

export default class SideMenu extends Component {

  render() {

    return (
      <View style={styles.container}>
        <FBLogin />

        <TouchableOpacity style={styles.settingsButton} >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
   )
  }
}



