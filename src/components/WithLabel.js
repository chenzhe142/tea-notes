/**
 * WithLabel.js
 *
 * ## Function
 *
 * ## Touch Event
 * None
 *
 * ## PropTypes
 * @param label
 * @param textStyle
 * @param children
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
 StyleSheet,
 Text,
 View,
 TouchableWithoutFeedback,
} from 'react-native';

export default class WithLabel extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.showPicker}>
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text style={this.props.textStyle}>{this.props.label}</Text>
          </View>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  label: {
    width: 30,
    alignItems: 'center',
    marginRight: 5,
    paddingTop: 0,
  },
});
