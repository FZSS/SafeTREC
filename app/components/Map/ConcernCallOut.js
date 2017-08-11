import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';

/* eslint react/prefer-stateless-function: 1 */
export default class ConcernCallOut extends Component {
  static propTypes = {
    // category : PropTypes.oneOf(['Pedestrian', 'Automobile', 'Bicycle']).isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View>
        <TouchableHighlight>
          <Text>{this.props.title}</Text>
        </TouchableHighlight>
        <TouchableHighlight>
          <Text>{this.props.description}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

