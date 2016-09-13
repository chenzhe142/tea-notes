/**
 * Setting.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Text,
  StatusBar,
  View
} from 'react-native';

import BackBtn from '../components/BackBtn';
import Button from '../components/Button';
import SlideSwitch from '../components/SlideSwitch';

import getFromStorage from '../utils/getFromStorage';
import saveToStorage from '../utils/saveToStorage';

import text from '../style/text';
import color from '../style/color';
import containers from '../style/containers';

import { SCREEN_WIDTH, CUSTOMIZED_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS } from '../constants';

export default class Setting extends Component {
  constructor(props) {
    super(props);

    this._selectTemperature = this._selectTemperature.bind(this);
    this._selectTime = this._selectTime.bind(this);

    this.state = {
      temperatureOptions: DEFAULT_SETTINGS.temperatureOptions,
      timeOptions: DEFAULT_SETTINGS.timeOptions,
    };
  }

  componentWillMount() {
    this.getData().done();
  }

  async getData() {
    try {
      let value = await AsyncStorage.getItem(CUSTOMIZED_SETTINGS_STORAGE_KEY);
      if (value !== null){
        const customizedSettings = JSON.parse(value);
        this.setState({
          temperatureOptions: customizedSettings.temperatureOptions,
          timeOptions: customizedSettings.timeOptions,
        });
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  _selectTemperature(id) {
    const temperatureOptions = Object.assign([], this.state.temperatureOptions);

    for (let i = 0; i < temperatureOptions.length; i++) {
      if (i === id) {
        temperatureOptions[i].isSelected = true;
      } else {
        temperatureOptions[i].isSelected = false;
      }
    }

    this.setState({ temperatureOptions });

    const customizedSettings = {
      temperatureOptions: temperatureOptions,
      timeOptions: this.state.timeOptions
    };
    saveToStorage(CUSTOMIZED_SETTINGS_STORAGE_KEY, JSON.stringify(customizedSettings));
  }

  _selectTime(id) {
    const timeOptions = Object.assign([], this.state.timeOptions);

    for (let i = 0; i < timeOptions.length; i++) {
      if (i === id) {
        timeOptions[i].isSelected = true;
      } else {
        timeOptions[i].isSelected = false;
      }
    }

    this.setState({ timeOptions });

    const customizedSettings = {
      temperatureOptions: this.state.temperatureOptions,
      timeOptions: timeOptions
    };
    saveToStorage(CUSTOMIZED_SETTINGS_STORAGE_KEY, JSON.stringify(customizedSettings));
  }

  render() {

    return (
      <View style={[containers.container, {justifyContent: 'flex-start', backgroundColor: color.white}]}>
        <StatusBar hidden={true} />
        <View style={{height: 48, backgroundColor: color.navbarGray}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <TouchableOpacity onPress={() => this.props.navigator.pop()}>
              <Text>close</Text>
            </TouchableOpacity>
            <Text style={[text.title, {fontSize: 17}]}>Settings</Text>
            <Text style={{color: 'rgba(0,0,0,0)'}}>close</Text>
          </View>
        </View>
        <View style={containers.container, {justifyContent: 'flex-start'}}>
          <View style={[containers.container, {margin: 10}]}>
            <View style={{marginBottom: 5}}>
              <Text style={text.subTitle}>Temperature</Text>
            </View>
            <SlideSwitch
              options={this.state.temperatureOptions}
              updateOption={this._selectTemperature} />
          </View>
          <View style={[containers.container, {margin: 10}]}>
            <View style={{marginBottom: 5}}>
              <Text style={text.subTitle}>Time</Text>
            </View>
            <SlideSwitch
              options={this.state.timeOptions}
              updateOption={this._selectTime} />
          </View>
        </View>
      </View>
    );
  }
}
