import { StyleSheet } from 'react-native';
import { windowWidth } from '../../constants/screen';

export default StyleSheet.create({
  typeCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'darkorange',
  },

  typeTitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },

  typeBackground: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: 'black',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
