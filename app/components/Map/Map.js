import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

const Map = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating
        size={props.size}
        {...props}
      />
    </View>
  );
};

Map.propTypes = {
  size: React.PropTypes.string,
};

Map.defaultProps = {
  size: 'large',
};

export default Map;