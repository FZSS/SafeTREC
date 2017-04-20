import React, {Component} from 'react';
import {
  Text,
  Modal,
  View
} from 'react-native'
import styles from './styles'

export default class ReportCard extends Component {

  openReportCard() {

  }

  render() {
    <View style={{marginTop: 22}}>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {alert("Modal has been closed.")}}
      >
        <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
        </View>
      </Modal>

      <TouchableHighlight onPress={() => {
        this.setModalVisible(true)
      }}>
        <Text>Show Modal</Text>
      </TouchableHighlight>

    </View>
  }
}


