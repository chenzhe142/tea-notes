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
  AsyncStorage,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

import getFromStorage from '../utils/getFromStorage';

import { CUSTOMIZED_TEA_LIST_STORAGE_KEY } from '../constants';

const propTypes = {
  setting: PropTypes.shape({
    temperature: PropTypes.string,
    time: PropTypes.string,
  })
};

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.setting = this.props.setting;
    this.state = {
      newTea: {},
    };
  }

  componentDidMount() {
    this.getData().done();
  }

  async getData() {
    try {
      let value = await AsyncStorage.getItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY);
      if (value !== null){
        const newTea = JSON.parse(value);
        this.setState({ newTea });
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    return (
      <View>
        <Text>{this.setting.temperature}</Text>
        <Text>{this.setting.time}</Text>
        <Text>name: {this.state.newTea.name}</Text>
        <Text>temperature: {this.state.newTea.temperature}</Text>
        <Text>time: {this.state.newTea.time}</Text>
      </View>
    );
  }
}

Setting.propTypes = propTypes;
