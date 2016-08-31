/**
 * Setting.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

export default class Setting extends Component {
  static PropTypes = {
    setting: PropTypes.shape({
      temperature: PropTypes.string,
      time: PropTypes.string,
    })
  }
  constructor(props) {
    super(props);
    this.setting = this.props.setting;
  }
  render() {
    return (
      <View>
        <Text>{this.setting.temperature}</Text>
        <Text>{this.setting.time}</Text>
      </View>
    );
  }
}
