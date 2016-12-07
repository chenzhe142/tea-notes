/**
 * Setting.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import BackBtn from '../components/BackBtn';
import IconButton from '../components/IconButton';
import SlideSwitch from '../components/SlideSwitch';

import text from '../style/text';
import color from '../style/color';
import colorScheme from '../style/colorScheme';
import containers from '../style/containers';

import {
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
  DEFAULT_SETTINGS,
  STATUS_BAR_HEIGHT_IOS
} from '../constants';

export default class Setting extends Component {
  state = {
    temperatureOptions: DEFAULT_SETTINGS.temperatureOptions,
    timeOptions: DEFAULT_SETTINGS.timeOptions,
    teaListOptions: DEFAULT_SETTINGS.teaListOptions,
  }

  constructor(props) {
    super(props);
    this._selectTemperature = this._selectTemperature.bind(this);
    this._selectTime = this._selectTime.bind(this);
    this._selectTeaListOption = this._selectTeaListOption.bind(this);
  }

  componentWillMount() {
    if (this.props.storage !== undefined) {
      if (this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content !== undefined) {
        const settings = this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content;
        this.setState({
          temperatureOptions: settings.temperatureOptions,
          timeOptions: settings.timeOptions
        });
      }
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
      timeOptions: this.state.timeOptions,
      teaListOptions: this.state.teaListOptions,
    };

    this.props.storageUnit.saveItem(CUSTOMIZED_SETTINGS_STORAGE_KEY, JSON.stringify(customizedSettings));
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
      timeOptions: timeOptions,
      teaListOptions: this.state.teaListOptions,
    };

    this.props.storageUnit.saveItem(CUSTOMIZED_SETTINGS_STORAGE_KEY, JSON.stringify(customizedSettings));
  }

  _selectTeaListOption(id) {
    const teaListOptions = Object.assign([], this.state.teaListOptions);

    for (let i = 0; i < teaListOptions.length; i++) {
      if (i === id) {
        teaListOptions[i].isSelected = true;
      } else {
        teaListOptions[i].isSelected = false;
      }
    }

    this.setState({ teaListOptions });
    const customizedSettings = {
      temperatureOptions: this.state.temperatureOptions,
      timeOptions: this.state.timeOptions,
      teaListOptions: teaListOptions
    };

    this.props.storageUnit.saveItem(CUSTOMIZED_SETTINGS_STORAGE_KEY, JSON.stringify(customizedSettings));
  }

  /**
   * remove "time" selection from settings
   */

    //  <View style={[containers.container, {margin: 10}]}>
    //    <View style={{marginBottom: 5}}>
    //      <Text style={text.subTitle}>Time</Text>
    //    </View>
    //    <SlideSwitch
    //      options={this.state.timeOptions}
    //      updateOption={this._selectTime} />
    //  </View>

  render() {

    console.log(this.state.teaListOptions);

    return (
      <View style={[containers.container, {backgroundColor: color.white}]}>
        <StatusBar hidden={false} />
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: colorScheme.color1}}></View>
        <View style={{height: 44, backgroundColor: colorScheme.color1}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <View style={[containers.row, {justifyContent: 'flex-start'}]}>
              <IconButton
                iconName="times"
                size={20}
                color={color.white}
                onForward={() => {
                  this.props.navigator.pop();
                }} />
            </View>
            <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[text.title, {color: color.white}]}>Settings</Text>
            </View>
            <View style={[containers.row, {justifyContent: 'flex-end'}]}>
            </View>
          </View>
        </View>
        <ScrollView bounces={false}>
          <View>
            <View style={[containers.container, {margin: 10}]}>
              <View style={{marginBottom: 5}}>
                <Text style={[text.subTitle, {fontSize: 16, color: color.gray}]}>Temperature</Text>
              </View>
              <SlideSwitch
                options={this.state.temperatureOptions}
                updateOption={this._selectTemperature} />
            </View>
            <View style={[containers.container, {margin: 10}]}>
              <View style={{marginBottom: 5}}>
                <Text style={[text.subTitle, {fontSize: 16, color: color.gray}]}>Built-in tea list</Text>
              </View>
              <SlideSwitch
                options={this.state.teaListOptions}
                updateOption={this._selectTeaListOption} />
            </View>
          </View>
        </ScrollView>
        <View style={{alignItems: 'center', padding: 10}}>
          <View style={{paddingBottom: 2}}>
            <Text style={{fontSize: 12, color: color.midGray}}>Tea Notes - v1.0.0</Text>
          </View>
          <Text style={{fontSize: 8, color: color.midGray}}>© Zhe Chen, 2016</Text>
        </View>
      </View>
    );
  }
}
