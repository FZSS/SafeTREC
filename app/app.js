import { registerScreens } from './screens';
import { Navigation } from 'react-native-navigation';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'app.Map',
    title: 'Map',
    navigatorStyle:{
      navBarHidden: true,
    },
  },
  drawer: {
    left: {
      screen: 'app.SideMenu'
    },
    disableOpenGesture: true
  }
});


