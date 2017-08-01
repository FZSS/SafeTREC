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

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dbeb31',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5cab3',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9ae33',
  },


});

export {navigatorStyle, styles};

