import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import styles from './styles';
import { updateConcernTypes } from '../../actions/concerns';

const modes = ['Pedestrian', 'Bicycle', 'Automobile'];

const mapStateToProps = state => ({
  types: state.concerns.concernTypes,
  coordinate: state.concerns.newConcern.coordinate,
});

const mapDispatchToProps = {
  updateConcernTypes,
};

class TypeCard extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(modes),
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    coordinate: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
    }).isRequired,
    updateConcernTypes: PropTypes.func.isRequired,
  };

  static defaultProps = {
    time: new Date(),
    mode: modes[0],
  };

  static navigatorButtons = {
    rightButtons: [{
      title: 'Skip',
      id: 'skip',
    }],
  };

  componentWillMount() {
    this.props.updateConcernTypes(this.props.mode, this.props.time, this.props.coordinate);
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'next') {
        this.openCommentCard('Other');
      }
    }
  }

  openCommentCard(type) {
    this.props.navigator.push({
      screen: 'app.CommentCard',
      title: 'Concern Details',
      backButtonTitle: 'Type',
      passProps: {
        concernType: type,
      },
    });
  }

  displayTypes() {
    // add the 'Other' type
    const types = _.clone(this.props.types);
    types.push('Other');
    return types.map((type, index) => (
      <TouchableOpacity
        /* eslint react/no-array-index-key: 1 */
        key={index}
        style={styles.typeCard}
        onPress={() => this.openCommentCard(type)}
      >
        <Text>
          {type}
        </Text>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View
        style={{ flex: 1 }}
      >
        {this.displayTypes()}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeCard);
