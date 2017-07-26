import React, {Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ActionSheetIOS,
  Text,
  Button,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import { navigatorStyle, styles } from './styles';
import { getConcernsInRegion, updateMapRegion } from '../../actions/map';

// Redux Store
function mapStateToProps(state) {
  return {
    concerns: state.concerns.concernsInMapRegion,
    mapRegion: state.map.mapRegion,
    userPosition: state.map.userPosition
  }

}

const mapDispatchToProps = {
    getConcernsInRegion,
    updateMapRegion
};

class Map extends Component {

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
    },
  };

  watchID: ?number = null;

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({userPosition:position.coords});
        let newMapRegion = JSON.parse(JSON.stringify(this.props.mapRegion));
        newMapRegion.latitude = position.coords.latitude;
        newMapRegion.longitude = position.coords.longitude;
        this.props.updateMapRegion(newMapRegion);
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
        let newMapRegion = JSON.parse(JSON.stringify(this.props.mapRegion));
        newMapRegion.latitude = place.latitude;
        newMapRegion.longitude = place.longitude;
        this.props.updateMapRegion(newMapRegion);
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  goToPictures(category) {
    this.props.navigator.push({
      screen: 'app.NewPictures',
      title:'Pictures',
      passProps: {
        reportCategory: category,
        mapRegion: this.state.mapRegion
      }
    })
  }

  openSideMenu() {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
      to: 'open'
    });
  }

  render() {
    return (
      <View style={{flex:1}}>

        <MapView
          style={{flex:1}}
          provider={PROVIDER_GOOGLE}
          // initialRegion={this.state.mapRegion}
          region={this.props.mapRegion}
          onRegionChange={(r) => this.props.updateMapRegion(r)}
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

          {this.props.concerns.map(concern => (
            <MapView.Marker
              key={concern.id}
              coordinate={concern.coordinate}
              title={concern.title}
              description={concern.description}
            />
          ))}

        </MapView>

        <TouchableOpacity
          style={styles.sideMenuContainer}
          onPress={()=> this.openSideMenu()}
        >
          <Icon name="ios-menu" style={styles.sideMenuIcon} />
        </TouchableOpacity>

        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position='center'
        >
          <ActionButton.Item buttonColor='#9b59b6' title="Pedestrian" onPress={() => this.goToPictures('Pedestrian')}>
            <Icon name="ios-walk" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Bicycle" onPress={() => this.goToPictures('Bicycle')}>
            <Icon name="ios-bicycle" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Automobile" onPress={() => this.goToPictures('Automobile')}>
            <Icon name="ios-car" style={styles.newReportButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

      </View>
    );
  }
}

Map.navigatorStyle = navigatorStyle;

export default connect(mapStateToProps, mapDispatchToProps)(Map);

