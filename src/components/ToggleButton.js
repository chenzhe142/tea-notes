import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native';

import text from '../style/text';
import color from '../style/color';
import containers from '../style/containers';

import { SCREEN_WIDTH } from '../constants';

export default class ToggleButton extends Component {
  render() {
    let backgroundColorStyle;
    let textColor;

    if (this.props.isSelected) {
      backgroundColorStyle = {
        backgroundColor: color.green
      };
    } else {
      backgroundColorStyle = {
        backgroundColor: color.lightGray
      };
      textColor = {
        color: color.midGray
      };
    }

    return (
      <TouchableWithoutFeedback onPress={this.props.toggleSelect}>
        <View style={[styles.button, backgroundColorStyle]}>
          <Text style={[text.button, textColor]}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 2,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.5 - 10,
  }
});
