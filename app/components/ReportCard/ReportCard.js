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
    return (
      <View style={{marginTop: 22}}>
        <Text>
          This is a report Card for type: {this.props.reportCategory}
        </Text>
      </View>
    )
  }
}


