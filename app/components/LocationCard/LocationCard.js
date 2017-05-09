import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ImagePickerIOS,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  SegmentedControlIOS
} from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default class LocationCard extends Component {

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
            reportCategory: this.props.reportCategory
          }
        })
      }
    }
  }


  state = {
    location: this.props.location,
    address: 'Address',
    mapRegion: this.props.mapRegion,
    coordinate: {
      longitude: this.props.mapRegion.longitude,
      latitude: this.props.mapRegion.latitude
    }
  };


  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        this.setState({address: place.address});
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
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
               {this.state.address}
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
                           coordinate={this.state.coordinate}
                           onDragEnd={(e) => this.setState({ coordinate: e.nativeEvent.coordinate })}
           />
         </MapView>

       </View>
    )
  }

}


class Picture extends Component {

  // render() {
  //   return (
  //     <View
  //       style={styles.onePicture}
  //     >
  //     </View>
  //   )
  // }

  render() {
    return (
      <Image style={{ width: 100}}
             source={{ uri: this.state.image}}
      />
    )
  }

}

