/**
 * WithLabel.js
 *
 * ## Function
 *
 * ## Touch Event
 * None
 *
 * ## PropTypes
 * @param iconName
 * @param textStyle
 * @param children
 *
 * @zchen
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import color from '../style/color';

export default class WithLabel extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.showPicker}>
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <IoniconsIcon name={this.props.iconName} size={20} color={color.pink} />
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
