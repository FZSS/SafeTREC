import React, {Component} from 'react';
import {
  PropTypes,
  StyleSheet,
  Text,
  View,
} from 'react-native'


import Drawer from 'react-native-drawer';
import ControlPanel from '../ControlPanel/ControlPanel'
import Map from '../Map/Map'

export default class App extends Component {
  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  render () {
    return (
      <Drawer
        type="overlay"
        content={<ControlPanel />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        initializeOpen={true}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
      >
        <Map/>
      </Drawer>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  }
});

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
