import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
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
  }
  render() {
    return (
      <View style={[styles.backBtn, {backgroundColor: 'rgba(0,0,0,0)'}]}>
        <TouchableWithoutFeedback onPress={this._onBack}>
          <View>
            <Text style={this.props.textStyle}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
