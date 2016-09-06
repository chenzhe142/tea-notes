/**
 * WithLabel.js
 *
 * ## Function
 *
 * ## Touch Event
 *
 * ## PropTypes
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
 StyleSheet,
 Text,
 View
} from 'react-native';

export default class WithLabel extends Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text style={this.props.textStyle}>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1,
  },
  label: {
    width: 30,
    alignItems: 'flex-end',
    marginRight: 5,
    paddingTop: 0,
  },
});
