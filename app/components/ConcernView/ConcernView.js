import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { navigatorStyle, styles} from './styles'
import { connect } from 'react-redux';
//TODO: using https://github.com/ahmed3mar/react-native-swiper/tree/proptypes because original package broke
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const mapStateToProps= (state) => {
  return {
    mapRegion: state.map.mapRegion
  }
};

const mapDispatchToProps = {
};

class ConcernView extends Component {


  dismissModal() {
    this.props.navigator.dismissModal();
  }

  componentWillMount() {
    this.props.mapRegion = {
        ...this.props.mapRegion,
        latitude: this.props.concern.coordinate.latitude,
        longitude: this.props.concern.coordinate.longitude,
        longitudeDelta: 0.001,
        latitudeDelta: 0.002
      }
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.swiperContainer}>
          <Swiper
              height={280}
              activeDotColor='orange'
              loop={false}
          >
            <View style={styles.slide1}>
              <Text style={styles.text}>Detail Picture 1</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Detail Picture 2</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>Detail Picture 3</Text>
            </View>
          </Swiper>
        </View>


        <View style={styles.detailsContainer}>
          <Text style={styles.titleText}>
            {this.props.concern.title || 'Concern Title'}
          </Text>
          <Text style={styles.descriptionText}>
            {this.props.concern.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
          </Text>
          <Text style={styles.descriptionText}>
            {this.props.concern.address || '2715 Dwight Way, CA 94704'}
          </Text>
          <Text style={styles.descriptionText}>
            {Math.floor(Math.random() * 20)} people think this is good!
          </Text>
        </View>

        <MapView
          style={styles.mapviewContainer}
          provider={PROVIDER_GOOGLE}
          region={this.props.mapRegion}
          mapType={"standard"}
          showsUserLocation={true}
          showsCompass={true}
          zoomEnabled={true}
          scrollEnabled={false}
        >
          <MapView.Marker coordinate={this.props.concern.coordinate}/>
        </MapView>


        <TouchableOpacity
          style={styles.dismissButton}
          onPress={()=> this.dismissModal()}
        >
          <Icon name="ios-close-circle-outline" style={styles.dismissIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}

ConcernView.navigatorStyle = navigatorStyle;

export default connect(mapStateToProps, mapDispatchToProps)(ConcernView);
