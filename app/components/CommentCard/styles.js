import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  categorySelection: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
  },

  back: {
    flex: 1,
    zIndex: 1
  },

  showProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    zIndex: 2
  },

  hideProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: window.height,
    backgroundColor: 'transparent',
    zIndex: 0
  },

  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },

  comment: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 5,
    paddingTop: 40,
    paddingLeft: 50,
    paddingRight: 50,

    fontSize: 20,
    color: 'darkorange',
    backgroundColor: 'yellow'
  },

});

