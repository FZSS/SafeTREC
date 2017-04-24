import React, {Component} from 'react';
import {
  Picker,
  Image,
  View,
  ImagePickerIOS,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import styles from './styles'
import NewPicture from '../NewPicture/NewPicture';

var imageKey = 3;

export default class ReportCard extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Submit',
        id: 'submit',
        buttonFontWeight: '900',
      },
    ]
  };

  static navigatorStyle = {
    navBarTextColor: 'white',
    navBarBackgroundColor: 'darkorange',
    navBarTranslucent: true,
    statusBarTextColorScheme: 'light',

    navBarLeftButtonColor: 'white',
    navBarButtonColor: 'white',
    navBarRightButtonFontSize: 17,
    navBarRightButtonColor: 'white',
    navBarRightButtonFontWeight: '800',
  };

  state = {
    category: this.props.reportCategory,
    images: [
      {key:1, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
      {key:2, uri: 'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'},
   ]
  };


  getImages() {
    return this.state.images.map((image) => {
      //TODO: replace image here with picture component to add the delete functionality
      return  <Image key={image.key} style={{width: 100}} source={{uri: image.uri}}/>
      // return  <View key={image.key} style={{width: 100, backgroundColor: 'green'}} />
    });
  }


  //TODO: this is not scrolling to the end for some reason right now
  componentDidUpdate() {
    console.log('should scroll');
    this._scrollView.scrollToEnd({animated:true});
  }

  takeNewPicture() {

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
      error => console.log(error))
  }

  render() {

    return (
       <View style={styles.container}>
         <View style={styles.picturesContainer}>
           <View style={styles.pictures}>
             <ScrollView
               horizontal={true}
               ref={(scrollView) => { this._scrollView = scrollView; }}
             >
               { this.getImages() }
             </ScrollView>
           </View>

           <View style={styles.addPictureContainer}>
             <View style={styles.addNewPictureContainer}>

             </View>
             <TouchableOpacity
               style={styles.addPictureFromLibrary}
               onPress={() => {
                 this.chooseFromLibrary();
               }}
             >

             </TouchableOpacity>
           </View>

         </View>

         <View style={styles.categorySelection}>
           <Picker
             selectedValue={this.state.category}
             onValueChange={(type) => this.setState({category: type})}>
             <Picker.Item label="Automobile" value="Automobile" />
             <Picker.Item label="Pedestrian" value="Pedestrian" />
             <Picker.Item label="Bicycle" value="Bicycle" />
           </Picker>
         </View>
         <View style={styles.comment}>

         </View>

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

