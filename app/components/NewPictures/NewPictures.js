import React, {Component} from 'react';
import {
  Text,
  View,
  ActionSheetIOS,
  Image,
  ScrollView,
  Button,
} from 'react-native'
import { styles, PHOTO_HEIGHT } from './styles'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import { addANewConcernImage, resetNewConcernImages } from '../../actions/images';
let imageKey = 1;

const mapStateToProps = state => {
  return {
    newImages: state.images.newConcernImages,
  }
};

const mapDispatchToProps =  {
  addANewConcernImage,
  resetNewConcernImages
};

class NewPicture extends Component {

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
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        this.goToLocationCard()
      }
    }
  }

  componentWillMount() {
    this.props.resetNewConcernImages();
  }

  state = {
    images: [
      {
        key: 0,
        uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg',
      }
    ],
  };

  openPictureActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
        options: [
          'Take A New Picture',
          'Choose From Library',
          'Cancel',
        ],
        cancelButtonIndex: 2,
        title: 'A picture is worth a thousand words',
        tintColor: 'darkorange'
      },

      (buttonIndex) => {
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

  goToLocationCard() {
    this.props.navigator.push({
      screen: 'app.LocationCard',
      title: 'Location',
      animated: true,
      passProps: {
        //pass the location of the first image
        pictureLocation: (this.state.images[1]) ? this.state.images[1].location : {},
        reportCategory: this.props.reportCategory,
      }
    })
  }

  addPicture(res) {
    let newKey = imageKey++;

    this.props.addANewConcernImage ({
      key: newKey,
      uri: res.uri,
      // the image picker response will have lat/long if available
      location: {
        longitude: res.longitude,
        latitude: res.latitude
      }
    });
  }

  getImages() {
    return this.props.newImages.map((image) => {
      return <Image key={image.key}
                    style={styles.picture}
                    source={{uri: image.uri}}/>
    });
  }

  takeNewPicture() {
    ImagePicker.launchCamera({},
      res => {
        this.addPicture(res);
      }
    )
  }

  choosePictureFromLibrary() {
    ImagePicker.launchImageLibrary({},
      res => {
        this.addPicture(res);
      }
    )
  }

  render() {
    return (
      <View
        style={styles.container}
      >
        <ScrollView
          ref={ref => this.scrollView = ref}
          style={styles.scrollViewContainer}

          //scroll to end when needed
          onContentSizeChange={(contentWidth, contentHeight) => {
            if (contentHeight > PHOTO_HEIGHT) {
              this.scrollView.scrollToEnd()
            }
          }}
        >

          {this.getImages()}

        </ScrollView>
        <Button
          onPress={() => this.openPictureActionSheet()}
          title="Add A Picture"
          color="darkorange"
        />
      </View>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPicture);