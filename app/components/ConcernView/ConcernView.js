import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native'
import { navigatorStyle, styles} from './styles'
import { connect } from 'react-redux';
//TODO: using https://github.com/ahmed3mar/react-native-swiper/tree/proptypes because original package broke
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {ASPECT_RATIO} from '../../constants/screen';
import { getConcernImages } from '../../actions/images';
const LATITUDE_DELTA = 0.001;

const mapStateToProps= state => {
  return {
    images: state.images.concernImages
  }
};

const mapDispatchToProps = {
  getConcernImages
};

class ConcernView extends Component {


  dismissModal() {
    this.props.navigator.dismissModal();
  }

  loadImages() {
    this.props.images.map((image) => {
      console.log(image);
      return <Image key={image.key}
                    style={styles.imageSlide}
                    source={{uri: image.uri}}/>
    })
  }

  componentWillMount() {
    this.props.getConcernImages(this.props.concern.id, this.props.concern.numberOfImages || 0);
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
            {/*<Image*/}
              {/*style={styles.imageSlide}*/}
              {/*source={{uri:'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'}}*/}
            {/*/>*/}
            {this.loadImages()}
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
          region={{
            latitude: this.props.concern.coordinate.latitude,
            longitude: this.props.concern.coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO,
          }}
          mapType={"standard"}
          showsUserLocation={true}
          zoomEnabled={true}
          scrollEnabled={true}
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
