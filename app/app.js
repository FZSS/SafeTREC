import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import registerScreens from './screens';

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    // screen: 'app.CommentCard',
    screen: 'app.Map',
    title: 'Map',
    navigatorStyle: {
      navBarHidden: true,
    },
  },
  drawer: {
    left: {
      screen: 'app.SideMenu',
    },
    disableOpenGesture: true,
  },
});

