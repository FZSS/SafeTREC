import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  ImagePickerIOS,
  TouchableOpacity
} from 'react-native'
import styles from './styles'
import NewPicture from '../NewPicture/NewPicture';

export default class ReportCard extends Component {

  state = {
    image: null
  };


  takeNewPicture() {

  }

  chooseFromLibrary() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
        console.log('image')
      }, error => console.error(error))
  }

  render() {
    return (
       <View style={styles.container}>
         <View style={styles.picturesContainer}>
           <View style={styles.pictures}>
              <Picture/>
           </View>
           <View style={styles.addPictureContainer}>
             <View style={styles.addNewPictureContainer}>

             </View>
             <TouchableOpacity
               style={styles.addPictureFromLibrary}
               onPress={() => this.chooseFromLibrary().bind(this)}
             >

             </TouchableOpacity>
           </View>

         </View>
         <View style={styles.categorySelection}>

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
             source={{ uri:'https://www.livemeshthemes.com/enigmatic/wp-content/uploads/sites/9/2012/07/placeholder1.jpg'}}
      />
    )
  }

}

