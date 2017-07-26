import React, { Component, PropTypes } from 'react';
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
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { uploadConcern } from '../../actions/concerns';

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
        // this.props.navigator.resetTo({
        //   screen: 'app.Map',
        // })
      }
    }
  }


  state = {
    reportCategory: this.props.reportCategory,
    concernDescription: '',
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
            onChangeText={(concernDescription) => this.setState({concernDescription})}
            value={this.state.concernDescription}
          >
          </TextInput>

       </View>
    )
  }
}

CommentCard.propTypes = {
  coordinate: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentCard);


