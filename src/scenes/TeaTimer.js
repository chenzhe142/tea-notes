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
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';

import text from '../style/text.js';
import color from '../style/color.js';
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
    };

    this.intervalId = null;
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
      this.intervalId = setInterval(() => {
        if ((that.state.remainTime > 0) && (this.state.isTimerStarted === true)) {
          const remainTime = that.state.remainTime - 1;
          that.setState({
            remainTime: remainTime,
          });
        }
      }, 1000);

    }
  }

  _resetTimer() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <View style={[containers.container, {justifyContent: 'flex-start'}]}>
        <StatusBar hidden={true} />
        <BackBtn navigator={this.props.navigator} textStyle={text.p} text="back" onPressEvent={this._resetTimer} />
        <View>
          <View style={[containers.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingTop: 200}]}>
            <Image style={{width: 192, height: 150}} source={require('../../public/image/tea-leaf.png')} />
            <Text style={[text.title, {fontSize: 30, fontWeight: 'normal'}]}>{this.state.remainTime} Sec</Text>
            <Text style={[text.p, {color: color.gray}]}>{this.props.currentSelectedTea.name}</Text>
            <Text style={[text.p, {color: color.gray}]}>{this.props.currentSelectedTea.temperature} - {this.props.currentSelectedTea.time}</Text>
          </View>
        </View>
        <View style={styles.controlBtn}>
          <Button btnText={this.state.timerBtnText} style={{backgroundColor: color.green}} onForward={this._toggleTimer} />
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
  }
});
