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
import {
  updateNewConcernAddressFromGeocode,
  updateNewConcernAddress,
  updateNewConcernCoordinates,
} from '../../actions/concerns';
import {
  updateMapRegion,
} from '../../actions/map';
import styles from './styles';

/* eslint react/prop-types: 1 */
const propTypes = {
};

const mapStateToProps = state => ({
  newConcern: state.concerns.newConcern,
  mapRegion: state.map.mapRegion,
});

const mapDispatchToProps = {
  updateNewConcernAddressFromGeocode,
  updateNewConcernAddress,
  updateNewConcernCoordinates,
  updateMapRegion,
};

class LocationCard extends Component {
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
          screen: 'app.CommentCard',
          title: 'Concern Details',
          passProps: {
            reportCategory: this.props.reportCategory,
          },
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
          onRegionChangeComplete={r => this.props.updateMapRegion(r)}
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

LocationCard.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);
