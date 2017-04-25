
import { Navigation } from 'react-native-navigation';

import Map from './components/Map/Map.js';
import ReportCard from './components/ReportCard/ReportCard';
import SideMenu from './components/SideMenu/SideMenu';
import NewPicture from './components/NewPicture/NewPicture'

export function registerScreens() {
  Navigation.registerComponent('app.Map', () =>  Map);
  Navigation.registerComponent('app.ReportCard', () => ReportCard);
  Navigation.registerComponent('app.SideMenu', () => SideMenu);
  Navigation.registerComponent('app.NewPicture', () => NewPicture);
}
