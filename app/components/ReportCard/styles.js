import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'orange',
  },

  locationContainer: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'red',

    paddingLeft: 10,
    paddingTop: 15,

    marginLeft: 10,
    marginRight: 10,

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

  picturesContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#ffcc00',

    paddingLeft: 5,
    paddingRight: 5,
  },

  picturesScrollView: {
    flex: 1,

    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5
  },

  onePicture: {
    width: 100,
    marginRight: 5,
  },

  addPictureContainer: {
    flex: 1.5,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-around',

    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    backgroundColor: '#ffcc00',
  },

  takeNewPicture: {
    flex: 1,
    backgroundColor: 'red',
    marginBottom: 5,
    marginRight: 20,
    marginTop: 5,
  },

  addPictureFromLibrary: {
    flex: 1,
    backgroundColor: 'crimson',
    marginBottom: 5,
    marginTop: 5,
  },

  categorySelection: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 40,
  },

  comment: {
    paddingTop: 40,
    paddingLeft: 50,
    paddingRight: 50,
    flex: 8,
    fontSize: 20,
    color: 'darkorange',
    backgroundColor: 'yellow'
  },



});

