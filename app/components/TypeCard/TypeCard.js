import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import styles from './styles';
import concernTypes, { concernTypeImages } from '../../constants/concernTypes';
import { updateConcernTypes } from '../../actions/concerns';

import modes from '../../constants/modesOfTransportation';

const mapStateToProps = state => ({
  types: state.concerns.concernTypes,
  concernCoordinate: state.concerns.newConcern.coordinate,
});

const mapDispatchToProps = {
  updateConcernTypes,
};

class TypeCard extends Component {
  static propTypes = {
    /* store states */
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    concernCoordinate: PropTypes.shape({
      longitude: PropTypes.number,
      latitude: PropTypes.number,
    }).isRequired,
    /* actions */
    updateConcernTypes: PropTypes.func.isRequired,
    /* own props */
    navigator: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    time: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(modes),

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

  // find the image that represents the type, if none found, use other.jpg
  static getImage(type) {
    if (concernTypes.includes(type)) {
      return concernTypeImages[type];
    }
    return concernTypeImages.Other;
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this.props.updateConcernTypes(this.props.mode, this.props.time, this.props.concernCoordinate);
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'skip') {
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
        <ImageBackground
          resizeMode={'cover'}
          source={TypeCard.getImage(type)}
          style={styles.typeBackground}
        >
          <Text style={styles.typeTitle}>
            {type}
          </Text>
        </ImageBackground>
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
