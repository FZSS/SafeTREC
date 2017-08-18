import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  ActionSheetIOS,
  Image,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { styles, PHOTO_HEIGHT } from './styles';
import { imagesPropTypes } from '../../reducers/imagesReducer';
import {
  addANewConcernImage,
  resetNewConcernImages,
  deleteANewConcernImage,
  getImagePredictions,
} from '../../actions/images';

const photoPlaceholder = require('../../images/photo.png');

let imageKey = 0;

const mapStateToProps = state => ({
  newImages: state.images.newConcernImages,
  imagePredictionEnabled: state.images.imagePredictionEnabled,
});

const mapDispatchToProps = {
  deleteANewConcernImage,
  addANewConcernImage,
  resetNewConcernImages,
  getImagePredictions,
};

class PicturesView extends Component {
  static propTypes = {
    /* store state */
    imagePredictionEnabled: PropTypes.bool.isRequired,
    newImages: PropTypes.arrayOf(imagesPropTypes.image).isRequired,
    /* actions */
    deleteANewConcernImage: PropTypes.func.isRequired,
    addANewConcernImage: PropTypes.func.isRequired,
    resetNewConcernImages: PropTypes.func.isRequired,
    getImagePredictions: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    modeOfTransportation: PropTypes.string.isRequired,
  };

  static navigatorStyle = {
    statusBarTextColorScheme: 'light',
  };

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Next',
        id: 'next',
        buttonFontWeight: '900',
      },
    ],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.resetNewConcernImages();
  }

  // componentDidMount() {
  //   this.takeNewPicture();
  // }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        if (this.props.newImages.length === 0) {
          // if there is no picture, it is fine, but just alert
          this.alertNoPicture();
        } else {
          if (this.props.imagePredictionEnabled) {
            // get computer vision tags from the first image
            this.props.getImagePredictions(this.props.newImages[0]);
          }
          this.goToLocationCard();
        }
      }
    }
  }

  getImages() {
    return this.props.newImages.map(image => (
      <TouchableHighlight
        onLongPress={() => this.openDeleteActionSheet(image.key)}
        key={image.key}
      >
        <Image style={styles.picture} source={{ uri: image.uri }} />
      </TouchableHighlight>
    ));
  }

  getPictureLocation() {
    const firstImage = this.props.newImages[0];
    return (firstImage) ? firstImage.location : null;
  }

  goToLocationCard() {
    this.props.navigator.push({
      screen: 'app.LocationCard',
      title: 'Confirm Location',
      animated: true,
      backButtonTitle: 'Pictures',
      passProps: {
        // pass the location of the first image if there is one
        pictureLocation: this.getPictureLocation(),
        modeOfTransportation: this.props.modeOfTransportation,
      },
    });
  }

  openDeleteActionSheet(key) {
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
      switch (buttonIndex) {
        case 0:
          this.props.deleteANewConcernImage(key);
          break;
      }
    });
  }

  openPictureActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Take A New Picture',
        'Choose From Library',
        'Cancel',
      ],
      cancelButtonIndex: 2,
      title: 'A picture is worth a thousand words',
      tintColor: 'darkorange',
    },

    (buttonIndex) => {
      /* eslint default-case: 0 */
      switch (buttonIndex) {
        case 0:
          this.takeNewPicture();
          break;
        case 1:
          this.choosePictureFromLibrary();
          break;
      }
    });
  }

  alertNoPicture() {
    Alert.alert(
      'No Picture',
      'Are you sure to proceed without a picture?',
      [
        { text: 'Confirm', onPress: () => this.goToLocationCard() },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }

  addPicture(res) {
    if (!res.didCancel) {
      const newKey = imageKey;
      imageKey += 1;

      this.props.addANewConcernImage({
        key: newKey,
        uri: res.uri,
        // the image picker response will have lat/long if available
        location: {
          longitude: res.longitude,
          latitude: res.latitude,
        },
      });
    }
  }

  takeNewPicture() {
    ImagePicker.launchCamera({},
      (res) => {
        this.addPicture(res);
      },
    );
  }

  choosePictureFromLibrary() {
    ImagePicker.launchImageLibrary({},
      (res) => {
        this.addPicture(res);
      },
    );
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          style={styles.scrollViewContainer}

          // scroll to end when needed
          onContentSizeChange={(contentWidth, contentHeight) => {
            if (contentHeight > PHOTO_HEIGHT) {
              this.scrollView.scrollToEnd();
            }
          }}
        >
          {this.getImages()}

          <TouchableHighlight
            onPress={() => this.openPictureActionSheet()}
            key={'placeholder'}
          >
            <Image style={styles.picture} source={photoPlaceholder} />
          </TouchableHighlight>

        </ScrollView>
        <Button
          onPress={() => this.openPictureActionSheet()}
          title="Add A Picture"
          color="darkorange"
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesView);
