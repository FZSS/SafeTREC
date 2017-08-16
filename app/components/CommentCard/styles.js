import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  card: {
    flex: 1,
    zIndex: 1,
  },

  categorySelection: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    height: 30,
  },

  predictionBox: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'darkorange',
    borderWidth: 1,
    borderBottomWidth: 0,
  },

  predictionTag: {
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    minWidth: 70,
    maxHeight: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'darkorange',
  },

  predictionTagText: {
    padding: 0,
    fontSize: 16,
    color: 'darkorange',
    textAlign: 'center',
  },

  ratingBox: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
  },

  ratingIcons: {
    flex: 2,
  },

  ratingText: {
    paddingTop: 9,
    fontSize: 18,
    flex: 1,
    color: 'darkorange',
    textAlign: 'center',
  },

  commentBox: {
    flex: 11,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
    borderColor: 'darkorange',
    borderWidth: 1,

    fontSize: 20,
    color: 'darkorange',
    backgroundColor: 'white',
  },

});

