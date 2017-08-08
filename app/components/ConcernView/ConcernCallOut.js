import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native'
import { styles } from './styles'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps= (state) => {
  return {
  }
};

const mapDispatchToProps = {
};

const propTypes = {
  // category : PropTypes.oneOf(['Pedestrian', 'Automobile', 'Bicycle']).isRequired,
  description : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
};


class concernCallOut extends Component {

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
    )
  }
}

concernCallOut.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(concernCallOut);
