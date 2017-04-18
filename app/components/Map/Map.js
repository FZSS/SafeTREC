import React, {Component} from 'react';
import {
  View,
  TextInput
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

export default class Map extends Component {
  render() {
    return (
      <View style={{flex:1, backgroundColor: '#ffffff'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121,
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

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position='center'
          style={styles.newReportButton}
        >
          <ActionButton.Item buttonColor='#9b59b6' title="Pedestrian" onPress={() => console.log("notes tapped!")}>
            <Icon name="ios-walk" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Bicycle" onPress={() => {}}>
            <Icon name="ios-bicycle" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Automobile" onPress={() => {}}>
            <Icon name="ios-car" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

 Map;