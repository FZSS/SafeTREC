import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'
import { connect } from 'react-redux';
import Carousel from 'react-native-carousel';

const mapStateToProps= (state) => {
  return {
  }
};

const mapDispatchToProps = {
};

class ConcernView extends Component {

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }


  render() {

    return (
      <Carousel>
        <View style={styles.container}>
          <Text>Page 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 3</Text>
        </View>
      </Carousel>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcernView);
