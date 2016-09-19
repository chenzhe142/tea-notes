import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { STATUS_BAR_HEIGHT_IOS } from '../constants';

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT_IOS,
    left: 10,
    right: 0,
    zIndex: 5,
  },
});

export default class BackBtn extends Component {
  constructor(props) {
    super(props);
    this._onBack = this._onBack.bind(this);
  }
  _onBack() {
    this.props.navigator.pop();
    if (this.props.onPressEvent) {
      this.props.onPressEvent();
    }
  }
  render() {
    return (
      <View style={[styles.backBtn, {backgroundColor: 'rgba(0,0,0,0)'}]}>
        <TouchableWithoutFeedback onPress={this._onBack}>
          <View>
            <Icon name="times" size={20} color="#ffffff" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
