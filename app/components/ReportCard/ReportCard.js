import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ImagePickerIOS,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ScrollView,
  SegmentedControlIOS
} from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

var imageKey = 5;

export default class ReportCard extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    leftButtons: [{
      title: 'Cancel',
      id: 'cancel'
    }],

    rightButtons: [{
        title: 'Submit',
        id: 'submit',
        buttonFontWeight: '900',
      }],
  };

  static navigatorStyle = {
    navBarTextColor: 'white',
    navBarBackgroundColor: 'darkorange',
    statusBarTextColorScheme: 'light',
    navBarNoBorder:true,

    navBarLeftButtonColor: 'white',
    navBarButtonColor: 'white',
    navBarRightButtonFontSize: 17,
    navBarRightButtonColor: 'white',
    navBarRightButtonFontWeight: '800',
  };

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.resetTo({
          screen: 'app.Map',
          animated: false,
        })
      }
      if (event.id ==='submit') {
      }
    }
  }


  state = {
    category: this.props.reportCategory,
    images: [
        {key:1, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
        {key:2, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
        {key:3, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
        {key:4, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
    ],
    location: 'Choose Location'
  };


  getImages() {
    return this.state.images.map((image) => {
      //TODO: replace image here with picture component to add the delete functionality
      return  <Image key={image.key} style={styles.onePicture} source={{uri: image.uri}}/>
      // return  <View key={image.key} style={{width: 100, backgroundColor: 'green'}} />
    });
  }

  static getCategoryIndex(category) {
    let indices = ['Automobile', 'Bicycle', 'Pedestrian'];
    return indices.indexOf(category);
  }

  //TODO: this scroll only sometimes
  componentDidUpdate() {
    console.log('should scroll');
    this._scrollView.scrollToEnd({animated:true});
  }

  takeNewPicture() {
    ImagePickerIOS.openCameraDialog({},
      imageUri => {
        let newKey = imageKey ++;
        this.state.images.push({
          key: newKey,
          uri: imageUri
        });
        this.setState({
          images: this.state.images
        })
      },
      error => console.log(error)
    )
  }

  chooseFromLibrary() {
    ImagePickerIOS.openSelectDialog({},
      imageUri => {
        let newKey = imageKey ++;
        this.state.images.push({
          key: newKey,
          uri: imageUri
        });
        this.setState({
          images: this.state.images
        })
      },
      error => console.log(error)
    )
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        this.setState({location: place.address});
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {

    return (
       <View style={styles.container}>

         <SegmentedControlIOS
           style={styles.categorySelection}
           tintColor="darkorange"
           values={['Automobile', 'Bicycle', 'Pedestrian']}
           selectedIndex={ReportCard.getCategoryIndex(this.state.category)}
           onValueChange={(value) => {
             this.setState({category: value});
           }}
         />

         <View style={styles.picturesContainer}>
           <ScrollView
             style={styles.picturesScrollView}
             horizontal={true}
             ref={(scrollView) => { this._scrollView = scrollView; }}
           >
             { this.getImages() }
           </ScrollView>
         </View>

         <View style={styles.addPictureContainer}>

           <TouchableOpacity
             style={styles.takeNewPicture}
             onPress={() => {
               this.takeNewPicture();
             }}
           >
             <Icon name="ios-camera" style={styles.locationIcon} />
           </TouchableOpacity>

           <TouchableOpacity
             style={styles.addPictureFromLibrary}
             onPress={() => {
               this.chooseFromLibrary();
             }}
           >
             <Icon name="ios-photos" style={styles.locationIcon} />
           </TouchableOpacity>
         </View>

         <TouchableOpacity
           style={styles.locationContainer}
           onPress={()=> this.openSearchModal()}
         >

           <View style={styles.locationIconContainer}>
             <Icon name="ios-pin" style={styles.locationIcon} />
           </View>

           <View style={styles.addressTextContainer}>
             <Text style={styles.addressText}>
               {this.state.location}
             </Text>

           </View>

           <View style={styles.locationArrowContainer}>
             <Icon name="ios-arrow-forward" style={styles.locationIcon} />
           </View>

         </TouchableOpacity>


          <TextInput
            placeholder={'What are you concerned about at this location?'}
            multiline = {true}
            editable = {true}
            style={styles.comment}
            placeholderTextColor={'orange'}
          >

          </TextInput>

       </View>
    )
  }

}


class Picture extends Component {

  // render() {
  //   return (
  //     <View
  //       style={styles.onePicture}
  //     >
  //     </View>
  //   )
  // }

  render() {
    return (
      <Image style={{ width: 100}}
             source={{ uri: this.state.image}}
      />
    )
  }

}

