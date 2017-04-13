/**
 * Created by kevin on 4/10/17.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

class App extends Component {
  render() {
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     Welcome to SafeTREC!
      //   </Text>
      //   <Text style={styles.instructions}>
      //     This is a community platform for traffic Safety Concern.
      //   </Text>
      //   <Text style={styles.instructions}>
      //     You can publish any traffic safety concerns around you.
      //   </Text>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
