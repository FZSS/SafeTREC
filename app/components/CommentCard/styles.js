import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  commentCard: {
    flex: 1,
    zIndex: 1,
  },

  categorySelection: {
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
  },

  predictionBox: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    // flex: 1,
  },

  comment: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,

    fontSize: 20,
    color: 'darkorange',
    backgroundColor: 'yellow',
  },

});

