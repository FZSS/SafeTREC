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
  imagePredictionEnabled: state.image.imagePredictionEnabled,
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
  };

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
