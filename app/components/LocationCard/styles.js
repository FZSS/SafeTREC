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
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'yellow',
    paddingTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },

  addressTextContainer: {
    flex: 6,
  },

  addressText: {
    color: 'darkorange',
    fontSize: 18,
    fontWeight: '600',
  },

  locationIconContainer: {
    paddingLeft: 30,
    flex: 1,
  },

  locationArrowContainer: {
    flex: 1,
  },

  locationIcon: {
    fontSize: 20,
    height: 22,
    color: 'darkorange',
  },

  mapviewContainer: {
    flex: 5,
  },


});

