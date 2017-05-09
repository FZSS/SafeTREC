import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SegmentedControlIOS
} from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons';
import RNGooglePlaces from 'react-native-google-places';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';


export default class CommentCard extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {

    rightButtons: [{
        title: 'Submit',
        id: 'submit',
        buttonFontWeight: '900',
      }],
  };

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'submit') {
        this.props.navigator.resetTo({
          screen: 'app.Map',
        })
      }
    }
  }


  state = {
    reportCategory: this.props.reportCategory
  };


  static getCategoryIndex(category) {
    let indices = ['Automobile', 'Bicycle', 'Pedestrian'];
    return indices.indexOf(category);
  }


  render() {

    return (
       <View style={styles.container}>

         <SegmentedControlIOS
           style={styles.categorySelection}
           tintColor="darkorange"
           values={['Automobile', 'Bicycle', 'Pedestrian']}
           selectedIndex={CommentCard.getCategoryIndex(this.state.reportCategory)}
           onValueChange={(value) => {
             this.setState({reportCategory: value});
           }}
         />


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

