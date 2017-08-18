import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import FBLogin from './FBLogin';

/* eslint react/prefer-stateless-function:0 */
export default class SideMenu extends Component {
  static propTypes = {
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  openSettings() {
    this.props.navigator.push({
      screen: 'app.SettingsView',
      title: 'Settings',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FBLogin />

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => this.openSettings()}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

