import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {
  updateNewConcernAddressFromGeocode,
  updateNewConcernAddress,
  updateNewConcernCoordinates,
} from '../../actions/concerns';
import { concernsPropTypes } from '../../reducers/concernsReducer';
import { mapPropTypes } from '../../reducers/mapReducer';
import {
  updateMapRegion,
  updateMapRegionWithFix,
} from '../../actions/map';
import styles from './styles';


const mapStateToProps = state => ({
  newConcern: state.concerns.newConcern,
  mapRegion: state.map.mapRegion,
});

const mapDispatchToProps = {
  updateNewConcernAddressFromGeocode,
  updateNewConcernAddress,
  updateNewConcernCoordinates,
  updateMapRegion,
  updateMapRegionWithFix,
};

class LocationCard extends Component {
  static propTypes = {
    /* store state */
    newConcern: concernsPropTypes.concern.isRequired,
    mapRegion: mapPropTypes.mapRegion.isRequired,
    /* actions */
    updateNewConcernAddressFromGeocode: PropTypes.func.isRequired,
    updateNewConcernAddress: PropTypes.func.isRequired,
    updateNewConcernCoordinates: PropTypes.func.isRequired,
    updateMapRegion: PropTypes.func.isRequired,
    updateMapRegionWithFix: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    pictureLocation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    pictureLocation: null,
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Next',
      id: 'next',
      buttonFontWeight: '900',
    }],
  };

  static validatePictureLocation(location) {
    if (!_.isEmpty(location)) {
      if (!_.isUndefined(location.latitude) && !_.isUndefined(location.longitude)) {
        return true;
      }
    }
    return false;
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    if (LocationCard.validatePictureLocation(this.props.pictureLocation)) {
      const lat = this.props.pictureLocation.latitude;
      const long = this.props.pictureLocation.longitude;
      const newMapRegion = {
        ...this.props.mapRegion,
        latitude: lat,
        longitude: long,
      };

      this.props.updateMapRegion(newMapRegion);
      this.props.updateNewConcernCoordinates(lat, long);
      this.props.updateNewConcernAddressFromGeocode(lat, long);
    } else {
      // If no GPS info in picture, assume we want to have a new concern at previous mapRegion
      const lat = this.props.mapRegion.latitude;
      const long = this.props.mapRegion.longitude;
      this.props.updateNewConcernCoordinates(lat, long);
      this.props.updateNewConcernAddressFromGeocode(lat, long);
    }
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        this.props.navigator.push({
          screen: 'app.TypeCard',
          title: 'What\'s your concern?',
          backButtonTitle: 'Location',
        });
      }
    }
  }

  onMarkerDragEnd(e) {
    const lat = e.nativeEvent.coordinate.latitude;
    const long = e.nativeEvent.coordinate.longitude;
    const newMapRegion = {
      ...this.props.mapRegion,
      latitude: lat,
      longitude: long,
    };

    this.props.updateMapRegion(newMapRegion);
    this.props.updateNewConcernCoordinates(lat, long);
    this.props.updateNewConcernAddressFromGeocode(lat, long);
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
        this.props.updateNewConcernAddress(place.address);
        this.props.updateNewConcernCoordinates(place.latitude, place.longitude);
      })
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => this.openSearchModal()}
        >

          <View style={styles.locationIconContainer}>
            <Icon name="ios-pin" style={styles.locationIcon} />
          </View>

          <View style={styles.addressTextContainer}>
            <Text style={styles.addressText}>
              {this.props.newConcern.address}
            </Text>

          </View>

          <View style={styles.locationArrowContainer}>
            <Icon name="ios-arrow-forward" style={styles.locationIcon} />
          </View>

        </TouchableOpacity>

        <MapView
          style={styles.mapviewContainer}
          provider={PROVIDER_GOOGLE}
          region={this.props.mapRegion}
          onRegionChangeComplete={r => this.props.updateMapRegionWithFix(r)}
          mapType={'standard'}
          showsUserLocation
          showsCompass
          showsMyLocationButton
        >
          <MapView.Marker
            draggable
            coordinate={this.props.newConcern.coordinate}
            onDragEnd={e => this.onMarkerDragEnd(e)}
          />
        </MapView>

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);
