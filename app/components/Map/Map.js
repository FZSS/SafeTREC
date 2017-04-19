import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Button
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';

import styles from './styles';

export default class Map extends Component {

  state = {
    userPosition: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0121,
    }
  };

  watchID: ?number = null;

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({userPosition:position.coords});
        let newMapRegion = JSON.parse(JSON.stringify(this.state.mapRegion));
        newMapRegion.latitude = position.coords.latitude;
        newMapRegion.longitude = position.coords.longitude;
        this.setState({mapRegion:newMapRegion});
        console.log(newMapRegion);
        console.log(this.state.mapRegion)
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({userPosition:position.coords});
    });
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        let newMapRegion = JSON.parse(JSON.stringify(this.state.mapRegion));
        newMapRegion.latitude = place.latitude;
        newMapRegion.longitude = place.longitude;
        this.setState({mapRegion:newMapRegion});
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }


  render() {
    return (
      <View style={{flex:1, backgroundColor: '#ffffff'}}>
        <MapView
          style={styles.container}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.mapRegion}
          region={this.state.mapRegion}
          onRegionChange={(r) => this.setState({mapRegion:r})}
          mapType={"standard"}
          showsUserLocation={true}
          showsCompass={true}
          showsMyLocationButton={true}
        >
          <TextInput
            style={styles.searchBox}
            placeholder="Where?"
            onFocus={() => this.openSearchModal()}
          >
          </TextInput>
        </MapView>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position='center'
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

