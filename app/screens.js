import { Navigation } from 'react-native-navigation';
import Map from './components/Map/Map';
import LocationCard from './components/LocationCard/LocationCard';
import SideMenu from './components/SideMenu/SideMenu';
import PicturesView from './components/PicturesView/PicturesView';
import CommentCard from './components/CommentCard/CommentCard';
import ConcernView from './components/ConcernView/ConcernView';
import TypeCard from './components/TypeCard/TypeCard';
import SettingsView from './components/SettingsView/SettingsView';

const registerScreens = (store, Provider) => {
  Navigation.registerComponent('app.Map', () => Map, store, Provider);
  Navigation.registerComponent('app.LocationCard', () => LocationCard, store, Provider);
  Navigation.registerComponent('app.PicturesView', () => PicturesView, store, Provider);
  Navigation.registerComponent('app.CommentCard', () => CommentCard, store, Provider);
  Navigation.registerComponent('app.ConcernView', () => ConcernView, store, Provider);
  Navigation.registerComponent('app.TypeCard', () => TypeCard, store, Provider);
  Navigation.registerComponent('app.SettingsView', () => SettingsView, store, Provider);
  Navigation.registerComponent('app.SideMenu', () => SideMenu);
};

export default registerScreens;
