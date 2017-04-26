import React, {Component} from 'react';
import {
  Text,
  View,
  ImagePickerIOS,
  Image
} from 'react-native'
import styles from './styles'
var ImagePicker = require('react-native-image-picker');

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

  goToReportCardWithGeoTag(res) {

    this.props.navigator.resetTo({
      screen: 'app.ReportCard',
      title:'New Safety Concern',
      animated: true,
      passProps: {
        longitude: res.longitude,
        latitude: res.latitude,
        imageURI: res.uri
      }
    })
  }

  takeNewPicture() {
    ImagePicker.launchCamera({},
      res => {this.goToReportCardWithGeoTag(res);}
    )
  }

  choosePictureFromLibrary() {
    ImagePicker.launchImageLibrary({},
      res => {this.goToReportCardWithGeoTag(res);}
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
