import { StyleSheet } from 'react-native';

const navigatorStyle = {
  navBarTextColor: 'white',
  navBarBackgroundColor: 'darkorange',
  navBarTranslucent: true,
  navBarNoBorder: true,
  navBarHidden: true,
  statusBarTextColorScheme: 'light',
  navBarLeftButtonColor: 'white',
  navBarButtonColor: 'white',
  navBarRightButtonFontSize: 17,
  navBarRightButtonColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
  },

  detailsContainer: {
    flex: 3,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#9b9b9b',
  },

  activityIndicator: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },


  dismissButton: {
    position: 'absolute',
    left: 20,
    top: 30,
    width: 30,
    height: 20,
    backgroundColor: 'transparent',
  },

  dismissIcon: {
    fontSize: 30,
    height: 30,
    color: 'white',
  },

  moreButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    width: 30,
    height: 20,
    backgroundColor: 'transparent',
  },

  moreIcon: {
    fontSize: 40,
    height: 40,
    color: 'white',
  },

  mapviewContainer: {
    flex: 3,
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  titleText: {
    color: '#fff',
    fontSize: 20,
    padding: 5,
  },

  descriptionText: {
    color: '#fff',
    fontSize: 16,
    padding: 5,
  },

  addressText: {
    color: '#fff',
    fontSize: 15,
    padding: 5,
  },

  detailsIcon: {
    color: '#fff',
    fontSize: 24,
  },

  imageSlide: {
    flex: 1,
  },

});

export { navigatorStyle, styles };

