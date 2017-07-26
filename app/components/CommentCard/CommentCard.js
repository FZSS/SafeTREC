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
    submissionStatus: state.concerns.newConcernSubmissionStatus
 }
};

const mapDispatchToProps = dispatch => {
  return {
    submitConcern: (details) => {
       dispatch(uploadConcern(details));
    }
  }
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

        //should be a state in redux
        let details =  {
          address: this.props.address,
          coordinate: this.props.coordinate,
          title: 'some title',
          description: this.state.concernDescription
        };

        this.props.submitConcern(details);
        this.props.navigator.setStyle({
            navBarHidden: true
          })

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

    if (prevProps.submissionStatus.pending === true) {
      if (this.props.submissionStatus.failed) {
        Alert.alert(
          'Failed Submission',
          'Sorry about that', //TODO: should show error msg
          [
            {text: 'OK', onPress: () => popToRoot()},
          ],
        )
      } else if (this.props.submissionStatus.success) {
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

         <View style={this.props.submissionStatus.pending ? styles.showProgress: styles.hideProgress}>
           <ActivityIndicator
             animating = {this.props.submissionStatus.pending}
             color = '#bc2b78'
             size = "large"
             style = {styles.activityIndicator}
           />
         </View>

       </View>
    )
  }
}

CommentCard.propTypes = {
  coordinate: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);


