import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* eslint no-unused-vars: 1 */
import { styles } from './styles';

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

const propTypes = {
  // category : PropTypes.oneOf(['Pedestrian', 'Automobile', 'Bicycle']).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

/* eslint react/prefer-stateless-function: 1 */
class ConcernCallOut extends Component {
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

ConcernCallOut.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ConcernCallOut);
