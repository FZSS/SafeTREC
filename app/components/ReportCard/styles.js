import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },

  picturesContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'navy',

    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },

  pictures: {
    flex: 5,
    backgroundColor: 'black',
    paddingLeft: 5,
    paddingRight: 5
  },

  addPictureContainer: {
    flex: 1,
    flexDirection: 'column',

    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'orange',
  },

  addNewPicture: {
    flex: 1,
    backgroundColor: 'red',
    marginBottom: 5,
    marginTop: 5,
  },

  addPictureFromLibrary: {
    flex: 1,
    backgroundColor: 'crimson',
    marginBottom: 5,
    marginTop: 5,
  },

  categorySelection: {
    flex: 1,
    // backgroundColor: 'cornflowerblue'
  },

  comment: {
    flex: 8,
    backgroundColor: 'cyan'
  },

  onePicture: {
    width: 50,

    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    backgroundColor: 'red'
  }

});

