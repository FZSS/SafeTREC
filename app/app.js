import { registerScreens } from './screens';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore.js';

const store = configureStore();

registerScreens(store, Provider);

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



