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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';

import text from '../style/text.js';
import color from '../style/color.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default class TeaTimer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <BackBtn navigator={this.props.navigator} textStyle={text.p} text="back" />
        <View>
          <View style={[styles.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 200}]}>
            <Image style={{width: 192, height: 150}} source={require('../../public/image/tea-leaf.png')} />
          </View>
        </View>
      </View>
    );
  }
}
