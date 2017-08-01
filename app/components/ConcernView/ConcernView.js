import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { navigatorStyle, styles} from './styles'
import { connect } from 'react-redux';
//TODO: using https://github.com/ahmed3mar/react-native-swiper/tree/proptypes because original package broke
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const mapStateToProps= (state) => {
  return {
  }
};

const mapDispatchToProps = {
};

const propTypes = {
  concernId: PropTypes.string.isRequired,
};

class ConcernView extends Component {


  dismissModal() {
    this.props.navigator.dismissModal();
  }

  render() {

    return (
      <View style={styles.container}>

        <View style={styles.container}>
          <Swiper
              height={300}
              activeDotColor='orange'
              loop={false}
          >
            <View style={styles.slide1}>
              <Text style={styles.text}>Detail</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Picture</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>Swipe</Text>
            </View>
          </Swiper>
        </View>

        <View style={styles.container}>
          <Text>
            {this.props.title}
          </Text>
          <Text>
          </Text>
        </View>

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
