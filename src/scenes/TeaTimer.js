/**
 * Main.js
 *
 * The main (and first) scene when opening the page.
 * It defines navigator globally, configures navigation transition animation.
 * Meanwhile, it stores all state, state related function in this class.
 *
 * @zchen
 */

import React, { Component } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  PushNotificationIOS,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const Sound = {
  MAIN_BUNDLE: '',
};

const BackgroundTimer = {
  setInterval: () => {},
  clearInterval: () => {},
};

import Button from '../components/Button.js';
import CloseBtn from '../components/CloseBtn.js';

import text from '../style/text.js';
import color from '../style/color.js';
import colorScheme from '../style/colorScheme.js';
import containers from '../style/containers.js';

import findSelectedSettingOption from '../utils/findSelectedSettingOption';

import {
  SCREEN_WIDTH,
  SYMBOL_CELSIUS,
  SYMBOL_FAHRENHEIT,
  SYMBOL_SECOND,
  DEFAULT_SETTINGS,
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
} from '../constants';

export default class TeaTimer extends Component {
  state = {
    isTimerStarted: false,
    remainTime: this.props.currentSelectedTea.time,
    timerBtnText: 'Brew!',
  }

  constructor(props) {
    super(props);

    this._toggleTimer = this._toggleTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);

    this.intervalId = null;

    this.timerAlarmSound = new Sound('timer-alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this.timerAlarmSound.getDuration() +
            'number of channels: ' + this.timerAlarmSound.getNumberOfChannels());
      }
    });

    this.settings = DEFAULT_SETTINGS;
    if (this.props.storage) {
      if (this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content) {
        this.settings = this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content;
      }
    }
  }

  _toggleTimer() {
    if (this.state.isTimerStarted === true) {
      this.setState({
        isTimerStarted: false,
        remainTime: this.props.currentSelectedTea.time,
        timerBtnText: 'Brew!'
      });

      this._resetTimer();

    } else {
      this.setState({
        isTimerStarted: true,
        timerBtnText: 'Reset'
      });

      const that = this;
      this.intervalId = BackgroundTimer.setInterval(() => {
        if (this.state.isTimerStarted === true) {
          if (that.state.remainTime > 1) {
            const remainTime = that.state.remainTime - 1;
            that.setState({
              remainTime,
            });
          } else {
            that.setState({
              remainTime: 0,
            });
            // Play the sound with an onEnd callback
            this.timerAlarmSound.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
            this.timerAlarmSound.setNumberOfLoops(2);

            Alert.alert(
              'Tea Notes',
              `${this.props.currentSelectedTea.name} is ready!`,
              [{
                text: 'OK', onPress: () => {
                  this.setState({
                    isTimerStarted: false,
                    remainTime: this.props.currentSelectedTea.time,
                    timerBtnText: 'Brew!'
                  });
                  this.timerAlarmSound.stop();
                }
              }]
            );
            PushNotificationIOS.presentLocalNotification({
              alertBody: `${this.props.currentSelectedTea.name} is ready!`,
            });
            PushNotificationIOS.setApplicationIconBadgeNumber(0);
            this._resetTimer();
          }
        }
      }, 1000);

    }
  }

  _resetTimer() {
    BackgroundTimer.clearInterval(this.intervalId);
  }

  render() {
    const temperatureOption = findSelectedSettingOption(this.settings.temperatureOptions);
    const timeOption = findSelectedSettingOption(this.settings.timeOptions);

    let temperatureSymbol;
    if (temperatureOption === 'celsius') {
      temperatureSymbol = SYMBOL_CELSIUS;
    } else {
      temperatureSymbol = SYMBOL_FAHRENHEIT;
    }
    let displayTemperature = `${this.props.currentSelectedTea.temperature} ${temperatureSymbol}`

    let timeSymbol = SYMBOL_SECOND;
    let displayTime = `${this.props.currentSelectedTea.time} ${timeSymbol}`;

    return (
      <View style={[containers.container, {justifyContent: 'flex-start', backgroundColor: colorScheme.color1}]}>
        <StatusBar hidden={false} />
        <CloseBtn navigator={this.props.navigator} onPressEvent={this._resetTimer} />
        <View>
          <View style={[containers.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingTop: 200}]}>
            <Text style={[text.title, {fontSize: 40, fontWeight: 'normal', backgroundColor: 'rgba(0,0,0,0)'}]}>{this.state.remainTime} Sec</Text>
          </View>
          <View style={[containers.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}]}>
            <Text style={[text.p, {fontSize: 18, color: color.gray, fontWeight: '700', backgroundColor: 'rgba(0,0,0,0)'}]}>{this.props.currentSelectedTea.name}</Text>
            <Text style={[text.p, {color: color.gray, backgroundColor: 'rgba(0,0,0,0)'}]}>{displayTemperature}</Text>
            <Text style={[text.p, {color: color.gray, backgroundColor: 'rgba(0,0,0,0)'}]}>{displayTime}</Text>
          </View>
        </View>
        <View style={styles.controlBtn}>
          <Button enableButtonStyle={true} btnText={this.state.timerBtnText} style={{backgroundColor: colorScheme.color5}} onForward={this._toggleTimer} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  controlBtn: {
    position: 'absolute',
    bottom: 0,
    left: SCREEN_WIDTH * 0.3,
    right: SCREEN_WIDTH * 0.3
  },
  progressBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: colorScheme.color2
  }
});
