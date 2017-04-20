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

