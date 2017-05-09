import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  locationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
  },

  addressTextContainer: {
    flex: 8,
  },

  addressText: {
    color: 'white',
    fontSize: 15,
    fontWeight:'600'
  },

  locationIconContainer: {
    flex: 1
  },

  locationArrowContainer: {
    flex: 1
  },

  locationIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },

  mapviewContainer: {
    flex: 4
  }


});

