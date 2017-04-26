import React, {Component} from 'react';
import {
  Text,
  View,
  ImagePickerIOS,
  Image
} from 'react-native'
import styles from './styles'

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


  takeNewPicture() {
    ImagePickerIOS.openCameraDialog({},
      imageUri => {
        this.setState({
          imageURI: imageUri
        })
      },
      error => console.log(error)
    )
  }

  choosePictureFromLibrary() {
    ImagePickerIOS.openSelectDialog({},
      imageUri => {
        this.setState({
          imageURI: imageUri
        })
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
        <Image source={{uri:this.state.imageURI}} style={{flex:1}}/>
        {/*<Image source={{uri:'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'}} style={{flex:1}}/>*/}
      </View>
    )
  }



}
