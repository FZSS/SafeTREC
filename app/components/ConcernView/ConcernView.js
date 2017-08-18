import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';
import { imagesPropTypes } from '../../reducers/imagesReducer';
import { mapPropTypes } from '../../reducers/mapReducer';
import { concernsPropTypes } from '../../reducers/concernsReducer';
import { navigatorStyle, styles } from './styles';
import { ASPECT_RATIO } from '../../constants/screen';
import { getConcernImages } from '../../actions/images';
import { deleteConcern } from '../../actions/concerns';
import { getConcernsInRegion } from '../../actions/map';
import SpinnerOverlay from '../SpinnerOverlay/SpinnerOverlay';

const imagePlaceholder = require('../../images/image-placeholder.png');

const LATITUDE_DELTA = 0.001;

const mapStateToProps = state => ({
  images: state.images.concernImages,
  imagesPending: state.images.concernImagesPending,
  deleteStatus: state.concerns.concernDeleteStatus,
  mapRegion: state.map.mapRegion,
});

const mapDispatchToProps = {
  getConcernImages,
  deleteConcern,
  getConcernsInRegion,
};

class ConcernView extends Component {
  static propTypes = {
    /* store states */
    images: PropTypes.arrayOf(imagesPropTypes.image).isRequired,
    imagesPending: PropTypes.bool.isRequired,
    deleteStatus: concernsPropTypes.concernDeleteStatus.isRequired,
    mapRegion: mapPropTypes.mapRegion.isRequired,
    /* actions */
    getConcernImages: PropTypes.func.isRequired,
    deleteConcern: PropTypes.func.isRequired,
    getConcernsInRegion: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    concern: concernsPropTypes.concern.isRequired,
  };

  static navigatorStyle = navigatorStyle;

  componentWillMount() {
    console.log(`Viewing concern: ${this.props.concern.id}`);
    this.props.getConcernImages(this.props.concern.id, this.props.concern.numberOfImages || 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.deleteStatus.pending) {
      if (this.props.deleteStatus.failed) {
        Alert.alert(
          'Deletion has failed',
          'Sorry', // TODO: should show error msg
          [
            { text: 'OK', onPress: () => this.dismissModal() },
          ],
        );
      } else if (this.props.deleteStatus.success) {
        this.props.getConcernsInRegion(this.props.mapRegion);
        Alert.alert(
          'Successfully deleted!',
          'Thanks',
          [
            { text: 'OK', onPress: () => this.dismissModal() },
          ],
        );
      }
    }
  }

  dismissModal() {
    this.props.navigator.dismissModal();
  }

  openDeleteActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Delete',
        'Cancel',
      ],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
      tintColor: 'darkorange',
    },

    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.props.deleteConcern(this.props.concern.id, this.props.concern.numberOfImages);
      }
    });
  }

  loadImages() {
    console.log(this.props.images);
    return this.props.images.map(image => (<Image
      key={image.key}
      style={styles.imageSlide}
      source={{ uri: image.uri }}
      defaultSource={imagePlaceholder}
      resizeMode={'cover'}
    />));
  }

  loadSwiper() {
    if (this.props.imagesPending) {
      return (
        <ActivityIndicator
          animating
          color="darkorange"
          size="large"
          style={styles.activityIndicator}
        />
      );
    }
    return (
      <Swiper
        height={980}
        activeDotColor="orange"
        loop={false}
      >
        {this.loadImages()}
      </Swiper>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <SpinnerOverlay visible={this.props.deleteStatus.pending} />

        <View style={styles.imagesContainer}>
          {this.loadSwiper()}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.titleText}>
            {this.props.concern.title || 'Concern Title'}
          </Text>
          <Text style={styles.descriptionText}>
            {this.props.concern.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
          </Text>
          <Text style={styles.descriptionText}>
            <Icon name="ios-thumbs-up" style={styles.detailsIcon} />
            {` ${Math.floor(Math.random() * 200)}`} people agree with this!
          </Text>
          <Text style={styles.addressText}>
            <Icon name="ios-pin" style={styles.detailsIcon} />
            {` ${this.props.concern.address}` || '2715 Dwight Way, CA 94704'}
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
          mapType={'standard'}
          showsUserLocation
          zoomEnabled
          scrollEnabled
        >
          <MapView.Marker coordinate={this.props.concern.coordinate} />
        </MapView>


        <TouchableOpacity
          style={styles.dismissButton}
          onPress={() => this.dismissModal()}
        >
          <Icon name="ios-close-circle-outline" style={styles.dismissIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => this.openDeleteActionSheet()}
        >
          <Icon name="ios-more-outline" style={styles.moreIcon} />
        </TouchableOpacity>

      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcernView);
