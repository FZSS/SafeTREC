/**
 * I built this Spinner Overlay because non of the available ones
 * serve my needs
 */
import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const window = Dimensions.get('window');
const styles = StyleSheet.create({
  showProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    zIndex: 10,
  },

  hideProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'transparent',
    zIndex: -10,
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});

export default class SpinnerOverlay extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
  };

  static defaultProps = {
    visible: false,
    color: 'darkorange',
  };

  render() {
    return (
      <View style={this.props.visible ? styles.showProgress : styles.hideProgress}>
        <ActivityIndicator
          animating={this.props.visible}
          color={this.props.color}
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}

