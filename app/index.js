/**
 * Created by kevin on 4/10/17.
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
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
      mapType={"standard"}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      <TextInput
        style={styles.searchBox}
        placeholder="Where?"
      />
    </MapView>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  searchBox:{

    backgroundColor: '#ffffff',
    height: 35,
    width: 220,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 90,
    shadowOffset:{
      width: 5,
      height: 5,
    },
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 1,
    paddingBottom: 1,
    fontSize: 18,

    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 3

  }
});

export default App;
