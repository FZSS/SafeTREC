import React, {Component} from 'react';
import {
  Text,
  View,
  ActionSheetIOS,
  Image,
  ScrollView,
  Button
} from 'react-native'
import styles from './styles'

//TODO:fix var
import ImagePicker from 'react-native-image-picker';

var imageKey = 1;

export default class NewPicture extends Component {

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

  state = {
    images: [
      {key: 0, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
    ],
  };


  //fixme: does not scroll
  componentDidMount() {
    console.log('should scroll');
    this._scrollView.scrollToEnd({animated:true});
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

  addPicture(res) {
    let newKey = imageKey ++;
    // if (newKey === 1) {
    //   this.setState({
    //     images: [{key: 0, uri:image}]
    //   })
    // }
    this.state.images.push({
      key: newKey,
      uri: res.uri
    });
    this.setState({
      images: this.state.images
    });
    console.log(this.state.images);
  }

  getImages() {
    return this.state.images.map((image) => {
      return  <Image key={image.key} style={{height: 200}} source={{uri: image.uri}}/>
    });
  }

  takeNewPicture() {
    ImagePicker.launchCamera({},
      res => {this.addPicture(res);}
    )
  }

  choosePictureFromLibrary() {
    ImagePicker.launchImageLibrary({},
      res => {this.addPicture(res);}
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{flex: 1}}
          ref={(scrollView) => { this._scrollView = scrollView; }}
        >
          { this.getImages() }
        </ScrollView>
        <Button
          onPress={()=>this.openPictureActionSheet()}
          title="Add A Picture"
          color="darkorange"
        />
      </View>
    )
  }



}
