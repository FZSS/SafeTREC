import React, {Component} from 'react';
import {
  Text,
  View,
  ActionSheetIOS,
  Image,
  ScrollView,
  Button,
  AlertIOS
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


  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type ==='NavBarButtonPress') {
      if (event.id === 'next') {
        this.goToLocationCard()
      }
    }
  }

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

  goToLocationCard() {
    this.props.navigator.push({
      screen: 'app.LocationCard',
      title:'Location',
      animated: true,
      passProps: {
        //pass the pictureCoordinate of the first image
        location: this.state.images[0].pictureCoordinate,
        reportCategory: this.props.reportCategory,
        mapRegion: this.props.mapRegion
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
      uri: res.uri,
      location: {
        longitude: res.longitude,
        latitude: res.latitude
      }
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
          style={styles.scrollViewContainer}
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
