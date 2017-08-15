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
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 30,
  },

  predictionBox: {
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    padding: 10,
    borderColor: 'darkorange',
    borderWidth: 1,
    borderBottomWidth: 0,
  },

  predictionTagContainer: {
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
    minWidth: 70,
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

  commentBox: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: 'darkorange',
    borderWidth: 1,

    fontSize: 20,
    color: 'darkorange',
    backgroundColor: 'yellow',
  },

});

