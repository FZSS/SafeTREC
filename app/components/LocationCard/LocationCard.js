import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import {
  updateNewConcernAddressFromGeocode,
  updateNewConcernAddress,
  updateNewConcernCoordinates
} from '../../actions/concerns';
import {
  updateMapRegion
} from '../../actions/map'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import _ from 'underscore';

const mapStateToProps= (state) => {
  return {
    newConcern: state.concerns.newConcern,
    mapRegion: state.map.mapRegion
  }
};

const mapDispatchToProps = {
  updateNewConcernAddressFromGeocode,
  updateNewConcernAddress,
  updateNewConcernCoordinates,
  updateMapRegion
};

class LocationCard extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    rightButtons: [{
        title: 'Next',
        id: 'next',
        buttonFontWeight: '900',
      }],
  };

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        this.props.navigator.push({
          screen: 'app.CommentCard',
          passProps: {
            reportCategory: this.props.reportCategory,
          }
        })
      }
    }
  }

  static validatePictureLocation(location) {
    if (!_.isEmpty(location)) {
      if (!_.isUndefined(location.latitude) && !_.isUndefined(location.longitude)) {
        return true;
      }
    }
    return false
  }

  componentDidMount() {
    if (LocationCard.validatePictureLocation(this.props.pictureLocation)) {
      console.log(this.props.pictureLocation);

      let lat = this.props.pictureLocation.latitude;
      let long = this.props.pictureLocation.longitude;
      let newMapRegion = {
        ...this.props.mapRegion,
        latitude: lat,
        longitude: long
      };

      this.props.updateMapRegion(newMapRegion);
      this.props.updateNewConcernCoordinates(lat, long);
      this.props.updateNewConcernAddressFromGeocode(lat, long);

    } else {
      // If no GPS info in picture, assume we want to have a new concern at previous mapRegion
      let lat = this.props.mapRegion.latitude;
      let long = this.props.mapRegion.longitude;
      this.props.updateNewConcernCoordinates(lat, long);
      this.props.updateNewConcernAddressFromGeocode(lat, long);
    }
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {


        let newMapRegion = {
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

  onMarkerDragEnd(e) {
    let lat = e.nativeEvent.coordinate.latitude;
    let long = e.nativeEvent.coordinate.longitude;
    let newMapRegion = {
      ...this.props.mapRegion,
      latitude: lat,
      longitude: long
    };

    this.props.updateMapRegion(newMapRegion);
    this.props.updateNewConcernCoordinates(lat, long);
    this.props.updateNewConcernAddressFromGeocode(lat, long);
  }

  render() {

    return (
       <View style={styles.container}>

         <TouchableOpacity
           style={styles.locationContainer}
           onPress={()=> this.openSearchModal()}
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
           onRegionChange={(r) => this.props.updateMapRegion(r)}
           mapType={"standard"}
           showsUserLocation={true}
           showsCompass={true}
           showsMyLocationButton={true}
         >
           <MapView.Marker draggable
                           coordinate={this.props.newConcern.coordinate}
                           onDragEnd={(e) => this.onMarkerDragEnd(e)}
           />
         </MapView>

       </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);
