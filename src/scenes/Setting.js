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
    settings: PropTypes.shape({
      temperature: PropTypes.string,
      time: PropTypes.string,
    })
  }
  constructor(props) {
    super(props);
    this.settings = this.props.settings;
  }
  render() {
    return (
      <View>
        <Text>{this.settings.temperature}</Text>
        <Text>{this.settings.time}</Text>
      </View>
    );
  }
}
