import React, { Component } from 'react';
import {
  View,
  Switch,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import { enableImagePrediction } from '../../actions/images';

const mapStateToProps = state => ({
  imagePredictionEnabled: state.images.imagePredictionEnabled,
  concernCoordinate: state.concerns.newConcern.coordinate,
});

const mapDispatchToProps = {
  enableImagePrediction,
};

/* eslint react/prefer-stateless-function:0 */
class SettingsView extends Component {
  static propTypes = {
    /* store states */
    imagePredictionEnabled: PropTypes.bool.isRequired,
    /* actions */
    enableImagePrediction: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static navigatorButtons = {
    leftButtons: [{
      title: 'Back',
      id: 'back',
    }],
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'back') {
        this.props.navigator.dismissModal();
      }
    }
  }

  render() {
    return (
      <View>
        <Text> Image Prediction </Text>
        <Switch
          value={this.props.imagePredictionEnabled}
          onValueChange={v => this.props.enableImagePrediction(v)}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
