import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { navigatorStyle, styles} from './styles'
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const mapStateToProps= (state) => {
  return {
  }
};

const mapDispatchToProps = {
};

const propTypes = {
  concernId: PropTypes.string.isRequired
};

class ConcernView extends Component {


  dismissModal() {
    this.props.navigator.dismissModal();
  }

  render() {

    return (
      <View style={styles.container}>
        {/*<Carousel>*/}
          {/*<View style={styles.container}>*/}
            {/*<Text>Page 1</Text>*/}
          {/*</View>*/}
          {/*<View style={styles.container}>*/}
            {/*<Text>Page 2</Text>*/}
          {/*</View>*/}
          {/*<View style={styles.container}>*/}
            {/*<Text>Page 3</Text>*/}
          {/*</View>*/}
        {/*</Carousel>*/}
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={()=> this.dismissModal()}
        >
          <Icon name="ios-close-circle-outline" style={styles.dismissIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}

ConcernView.navigatorStyle = navigatorStyle;

ConcernView.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ConcernView);
