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
import PropTypes from 'prop-types';
import { mapPropTypes } from '../../reducers/mapReducer';
import { navigatorStyle, styles } from './styles';
import ConcernCallOut from './ConcernCallOut';
import {
  getConcernsInRegion,
  updateMapRegion,
  updateMapRegionWithFix,
  updateUserLocation,
} from '../../actions/map';

const modes = ['Pedestrian', 'Bicycle', 'Automobile'];

const mapStateToProps = state => ({
  concerns: state.map.concernsInMapRegion,
  mapRegion: state.map.mapRegion,
});

const mapDispatchToProps = {
  updateMapRegionWithFix,
  getConcernsInRegion,
  updateMapRegion,
  updateUserLocation,
};

class Map extends Component {
  static propTypes = {
    /* store states */
    concerns: mapPropTypes.concernsInMapRegion.isRequired,
    mapRegion: mapPropTypes.mapRegion.isRequired,
    /* actions */
    updateMapRegionWithFix: PropTypes.func.isRequired,
    getConcernsInRegion: PropTypes.func.isRequired,
    updateMapRegion: PropTypes.func.isRequired,
    updateUserLocation: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.initializeMap(position);
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
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

  goToPictures(mode) {
    this.props.navigator.push({
      screen: 'app.PicturesView',
      title: 'Add Pictures',
      passProps: {
        modeOfTransportation: mode,
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
          region={this.props.mapRegion}
          onRegionChange={r => this.props.updateMapRegionWithFix(r)}
          onRegionChangeComplete={r => this.props.getConcernsInRegion(r)}
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
          size={80}
        >
          <ActionButton.Item buttonColor="#9b59b6" title={modes[0]} onPress={() => this.goToPictures(modes[0])}>
            <Icon name="ios-walk" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" title={modes[1]} onPress={() => this.goToPictures(modes[1])}>
            <Icon name="ios-bicycle" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#1abc9c" title={modes[2]} onPress={() => this.goToPictures(modes[2])}>
            <Icon name="ios-car" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

Map.navigatorStyle = navigatorStyle;

export default connect(mapStateToProps, mapDispatchToProps)(Map);

