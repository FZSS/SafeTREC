import { StyleSheet } from 'react-native';
import { windowWidth } from '../../constants/screen';

export default StyleSheet.create({
  typeCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'darkorange',
  },

  typeTitle: {
    color: 'darkorange',
    fontSize: 25,
    textAlign: 'center',
  },

  typeBackground: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

});
