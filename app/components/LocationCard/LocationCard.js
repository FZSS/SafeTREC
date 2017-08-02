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
import { getNewConcernAddressFromPictureGeocode, updateNewConcernAddress } from '../../actions/concerns';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const mapStateToProps= (state) => {
  return {
    address: state.concerns.newConcern.address
  }
};

const mapDispatchToProps = {
  getNewConcernAddressFromPictureGeocode,
  updateNewConcernAddress
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
            coordinate: {
              latitude: this.state.mapRegion.latitude,
              longitude: this.state.mapRegion.longitude,
            },
            address: this.props.address,
          }
        })
      }
    }
  }

  state = {
    mapRegion: this.props.mapRegion,
    markerCoordinate: {
      longitude: this.props.mapRegion.longitude,
      latitude: this.props.mapRegion.latitude
    }
  };

  componentWillMount() {
    if (this.props.pictureLocation) {
      console.log(this.props.pictureLocation.latitude);
      this.props.getNewConcernAddressFromPictureGeocode(this.props.pictureLocation.latitude,
                                                        this.props.pictureLocation.longitude);
    }
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.props.updateNewConcernAddress(place.address);

        let newMapRegion = JSON.parse(JSON.stringify(this.state.mapRegion));
        newMapRegion.latitude = place.latitude;
        newMapRegion.longitude = place.longitude;
        this.setState({mapRegion:newMapRegion});

        let newCoordinate = JSON.parse(JSON.stringify(this.state.markerCoordinate));
        newCoordinate.latitude = place.latitude;
        newCoordinate.longitude = place.longitude;
        this.setState({markerCoordinate:newCoordinate});

      })
      .catch(error => console.log(error.message));
  }

  onMarkerDragEnd(e) {
    this.setState({ markerCoordinate: e.nativeEvent.coordinate })
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
               {this.props.address}
             </Text>

           </View>

           <View style={styles.locationArrowContainer}>
             <Icon name="ios-arrow-forward" style={styles.locationIcon} />
           </View>

         </TouchableOpacity>

         <MapView
           style={styles.mapviewContainer}
           provider={PROVIDER_GOOGLE}
           region={this.state.mapRegion}
           onRegionChange={(r) => this.setState({mapRegion:r})}
           mapType={"standard"}
           showsUserLocation={true}
           showsCompass={true}
           showsMyLocationButton={true}
         >
           <MapView.Marker draggable
                           coordinate={this.state.markerCoordinate}
                           onDragEnd={(e) => this.onMarkerDragEnd(e)}
           />
         </MapView>

       </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationCard);
