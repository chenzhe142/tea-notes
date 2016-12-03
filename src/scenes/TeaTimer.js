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
  AppState,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  PushNotificationIOS,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';

import text from '../style/text.js';
import color from '../style/color.js';
import colorScheme from '../style/colorScheme.js';
import containers from '../style/containers.js';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';

export default class TeaTimer extends Component {
  constructor(props) {
    super(props);

    this._toggleTimer = this._toggleTimer.bind(this);
    this._resetTimer = this._resetTimer.bind(this);

    this.state = {
      isTimerStarted: false,
      remainTime: this.props.currentSelectedTea.time,
      timerBtnText: 'Brew!',
      topDistance: SCREEN_HEIGHT,
    };

    this.intervalId = null;

    this.timerAlarmSound = new Sound('timer-alarm.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        console.log('duration in seconds: ' + this.timerAlarmSound.getDuration() +
            'number of channels: ' + this.timerAlarmSound.getNumberOfChannels());
      }
    });
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
            const topDistance = this.state.topDistance - 5;
            that.setState({
              remainTime,
              topDistance
            });
          } else {
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
              'Brew Master',
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
            this._resetTimer();
            this.setState({ topDistance: SCREEN_HEIGHT });
          }
        }
      }, 1000);

    }
  }

  _resetTimer() {
    BackgroundTimer.clearInterval(this.intervalId);
  }

  render() {
    return (
      <View style={[containers.container, {justifyContent: 'flex-start', backgroundColor: colorScheme.color1}]}>
        <StatusBar hidden={true} />
        <BackBtn navigator={this.props.navigator} onPressEvent={this._resetTimer} />
        <View>
          <View style={[containers.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingTop: 200}]}>
            <Text style={[text.title, {fontSize: 30, fontWeight: 'normal', backgroundColor: 'rgba(0,0,0,0)'}]}>{this.state.remainTime} Sec</Text>
            <Text style={[text.p, {color: color.gray, backgroundColor: 'rgba(0,0,0,0)'}]}>{this.props.currentSelectedTea.name}</Text>
            <Text style={[text.p, {color: color.gray, backgroundColor: 'rgba(0,0,0,0)'}]}>{this.props.currentSelectedTea.temperature} - {this.props.currentSelectedTea.time}</Text>
          </View>
        </View>
        <View style={styles.controlBtn}>
          <Button enableButtonStyle={true} btnText={this.state.timerBtnText} style={{backgroundColor: colorScheme.color5}} onForward={this._toggleTimer} />
        </View>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={[styles.progressBackground, {top: this.state.topDistance}]}>
        </Animatable.View>
      </View>
    );
  }
}

// <Image style={{width: 192, height: 150}} source={require('../../public/image/tea-leaf.png')} />

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
