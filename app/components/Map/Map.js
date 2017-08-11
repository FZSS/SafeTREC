import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import { navigatorStyle, styles } from './styles';
import ConcernCallOut from './ConcernCallOut';
import { getConcernsInRegion, updateMapRegion, updateUserLocation } from '../../actions/map';

/* eslint react/prop-types: 1 */
const propTypes = {
};

const mapStateToProps = state => ({
  concerns: state.map.concernsInMapRegion,
  mapRegion: state.map.mapRegion,
  userPosition: state.map.userPosition,
});

const mapDispatchToProps = {
  getConcernsInRegion,
  updateMapRegion,
  updateUserLocation,
};

class Map extends Component {
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.initializeMap(position);
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  updateMapOnRegionChange(mapRegion) {
    this.props.updateMapRegion(mapRegion);
    this.props.getConcernsInRegion(mapRegion);
  }

  initializeMap(position) {
    const newMapRegion = { ...this.props.mapRegion,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    this.props.updateUserLocation(position.coords);
    this.props.updateMapRegion(newMapRegion);
    this.props.getConcernsInRegion(newMapRegion);
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        const newMapRegion = {
          ...this.props.mapRegion,
          latitude: place.latitude,
          longitude: place.longitude,
        };
        this.props.updateMapRegion(newMapRegion);
      })
      .catch(error => console.log(error.message));
  }

  goToPictures(category) {
    this.props.navigator.push({
      screen: 'app.NewPictures',
      title: 'Add Pictures',
      passProps: {
        reportCategory: category,
      },
    });
  }

  openSideMenu() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open',
    });
  }

  showConcernDetail(concern) {
    this.props.navigator.showModal({
      screen: 'app.ConcernView',
      title: 'Details',
      passProps: {
        concern,
      },
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          // initialRegion={this.state.mapRegion}
          region={this.props.mapRegion}
          onRegionChange={r => this.updateMapOnRegionChange(r)}
          mapType={'standard'}
          showsUserLocation
          showsCompass
          showsMyLocationButton
        >

          <TextInput
            style={styles.searchBox}
            placeholder="View traffic concerns at?"
            onFocus={() => this.openSearchModal()}
          />

          {this.props.concerns.map(concern => (
            <MapView.Marker
              key={concern.id}
              coordinate={concern.coordinate}
            >
              <MapView.Callout tooltip={false} onPress={() => this.showConcernDetail(concern)}>
                <ConcernCallOut title={concern.title} description={concern.description} />
              </MapView.Callout>

            </MapView.Marker>
          ))}

        </MapView>

        <TouchableOpacity
          style={styles.sideMenuContainer}
          onPress={() => this.openSideMenu()}
        >
          <Icon name="ios-menu" style={styles.sideMenuIcon} />
        </TouchableOpacity>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position="center"
        >
          <ActionButton.Item buttonColor="#9b59b6" title="Pedestrian" onPress={() => this.goToPictures('Pedestrian')}>
            <Icon name="ios-walk" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title="Bicycle" onPress={() => this.goToPictures('Bicycle')}>
            <Icon name="ios-bicycle" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title="Automobile" onPress={() => this.goToPictures('Automobile')}>
            <Icon name="ios-car" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

Map.navigatorStyle = navigatorStyle;
Map.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Map);

