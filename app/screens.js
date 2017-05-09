
import { Navigation } from 'react-native-navigation';

import Map from './components/Map/Map.js';
import LocationCard from './components/LocationCard/LocationCard';
import SideMenu from './components/SideMenu/SideMenu';
import NewPictures from './components/NewPictures/NewPictures';
import CommentCard from './components/CommentCard/CommentCard'

export function registerScreens() {
  Navigation.registerComponent('app.Map', () =>  Map);
  Navigation.registerComponent('app.LocationCard', () => LocationCard);
  Navigation.registerComponent('app.SideMenu', () => SideMenu);
  Navigation.registerComponent('app.NewPictures', () => NewPictures);
  Navigation.registerComponent('app.CommentCard', () => CommentCard);
}
