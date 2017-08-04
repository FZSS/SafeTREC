import React, { Component } from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SegmentedControlIOS,
  ActivityIndicator,
  Alert
} from 'react-native'
import styles from './styles'
import { connect } from 'react-redux';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { uploadConcern } from '../../actions/concerns';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return {
    detailsStatus: state.concerns.newConcernSubmissionStatus,
    newConcern: state.concerns.newConcern,
    newImages: state.images.newConcernImages,
    imageStatus: state.images.newConcernImagesUploadStatus
  }
};

const mapDispatchToProps =  {
  uploadConcern,
};

class CommentCard extends Component {

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

        this.props.navigator.setStyle({
          navBarHidden: true
        });

        let details =  {
          address: this.props.newConcern.address,
          coordinate: this.props.newConcern.coordinate,
          title: this.props.reportCategory + ' concern' ,
          description: this.state.concernDescription
        };

        this.props.uploadConcern(details, this.props.newImages);
      }
    }
  }

  state = {
    reportCategory: this.props.reportCategory,
    concernDescription: '',
  };

  componentDidUpdate(prevProps, prevState) {

    const popToRoot = () => {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      })
    };

    //Fixme: double failure message, need to work on logic
    if (prevProps.detailsStatus.pending || prevProps.imageStatus.pending) {
      if (this.props.detailsStatus.failed || this.props.imageStatus.failed) {
        Alert.alert(
          'Failed Submission',
          'Sorry about that', //TODO: should show error msg
          [
            {text: 'OK', onPress: () => popToRoot()},
          ],
        )
      } else if (this.props.detailsStatus.success && this.props.imageStatus.success) {
        Alert.alert(
          'Successful Submission',
          'Thank you', //TODO: should show error msg
          [
            {text: 'OK', onPress: () => popToRoot()},
          ],
        )
      }
    }
  }


  static getCategoryIndex(category) {
    let indices = ['Automobile', 'Bicycle', 'Pedestrian'];
    return indices.indexOf(category);
  }

  render() {

    return (
       <View style={styles.container}>

         <View style={styles.back}>

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
             onChangeText={(concernDescription) => this.setState({concernDescription})}
             value={this.state.concernDescription}
           >
           </TextInput>

         </View>

         <View style={ (this.props.detailsStatus.pending || this.props.imageStatus.pending) ?
                        styles.showProgress: styles.hideProgress}
         >
           <ActivityIndicator
             animating = {this.props.detailsStatus.pending || this.props.imageStatus.pending}
             color = 'darkorange'
             size = "large"
             style = {styles.activityIndicator}
           />
         </View>

       </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);


