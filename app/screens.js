
import { Navigation } from 'react-native-navigation';

import Map from './components/Map/Map.js';
import LocationCard from './components/LocationCard/LocationCard';
import SideMenu from './components/SideMenu/SideMenu';
import NewPictures from './components/NewPictures/NewPictures';
import CommentCard from './components/CommentCard/CommentCard';
import ConcernView from './components/ConcernView/ConcernView';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('app.Map', () =>  Map, store, Provider);
  Navigation.registerComponent('app.LocationCard', () => LocationCard, store, Provider);
  Navigation.registerComponent('app.NewPictures', () => NewPictures, store, Provider);
  Navigation.registerComponent('app.CommentCard', () => CommentCard, store, Provider);
  Navigation.registerComponent('app.ConcernView', () => ConcernView, store, Provider);
  Navigation.registerComponent('app.SideMenu', () => SideMenu);
}