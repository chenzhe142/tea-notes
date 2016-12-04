import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

import text from '../style/text';

export default class NotificationModal extends Component {

  state = {
    modalVisible: false,
  }

  render() {
    const innerContainerTransparentStyle = {  };

    return (
      <Modal
        animationType={'fade'}
        visible={this.props.modalVisible}
        transparent={true}
        >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={[text.p, {fontSize: 12, color: '#fff'}]}>{this.props.modalMessage}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 100,
  },
  innerContainer: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
  },
});
