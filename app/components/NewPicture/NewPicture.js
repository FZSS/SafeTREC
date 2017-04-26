import React, {Component} from 'react';
import {
  Text,
  View,
  ImagePickerIOS,
  Image
} from 'react-native'
import styles from './styles'
import Exif from 'react-native-exif'

export default class NewPicture extends Component {

  static navigatorStyle = {
    navBarHidden: true
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


  state = {
    imageURI: 'null'
  };

  goToReportCardWithGeoTag(imageUri) {

    function processGeoTagAndPush(data) {
      console.log(data);
      // console.log(data.exif);

      this.props.navigator.resetTo({
        screen: 'app.ReportCard',
        title:'New Safety Concern',
        animated: false,
        // passProps: {gps:data.GPS}
      })
    }

    Exif.getExif(imageUri)
      .then(processGeoTagAndPush.bind(this))
  }

  takeNewPicture() {
    ImagePickerIOS.openCameraDialog({},
      imageUri => {
        this.setState({
          imageURI: imageUri
        });
        this.goToReportCardWithGeoTag(imageUri);
     },
      error => console.log(error)
    )
  }

  choosePictureFromLibrary() {
    ImagePickerIOS.openSelectDialog({},
      imageUri => {
        this.setState({
          imageURI: imageUri
        });
        this.goToReportCardWithGeoTag(imageUri);
      },
      error => console.log(error)
    )
  }

  componentWillMount() {
    if (this.props.camera) {
      this.takeNewPicture();
    } else {
      this.choosePictureFromLibrary();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Image source={{uri:this.state.imageURI}} style={{flex:1}}/>*/}
      </View>
    )
  }



}
