import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import styles from './styles';

class Map extends Component {
  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0321,
        }}
        mapType={"standard"}
        showsUserLocation={true}
        showsCompass={true}
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

export default Map;