import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  searchBox: {
    color: 'grey',
    backgroundColor: '#ffffff',
    height: 35,
    width: 220,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 90,
    shadowOffset:{
      width: 5,
      height: 4,
    },
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 1,
    paddingBottom: 1,
    fontSize: 18,

    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 3
  },

  newReportButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },

});