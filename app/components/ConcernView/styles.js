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

  swiperContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'grey',
  },

  dismissButton: {
    position:'absolute',
    left: 20,
    top: 30,
    width: 30,
    height: 20,
    backgroundColor:'transparent',
  },

  dismissIcon: {
    fontSize: 30,
    height: 30,
    color: 'white'
  },

  mapviewContainer: {
    flex: 3
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  titleText: {
    color: '#fff',
    fontSize: 20,
    padding: 5
  },

  descriptionText: {
    color: '#fff',
    fontSize: 16,
    padding: 5
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d4d915',
  },

  imageSlide: {
    height: 250
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e55721',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9ae33',
  },


});

export {navigatorStyle, styles};

