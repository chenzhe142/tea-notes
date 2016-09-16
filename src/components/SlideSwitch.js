/**
 * SlideSwitch.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import ToggleButton from './ToggleButton';

import text from '../style/text';
import color from '../style/color';
import containers from '../style/containers';

import { SCREEN_WIDTH } from '../constants';

export default class SlideSwitch extends Component {
  render() {
    return (
      <View style={containers.row}>
        <View style={{width: SCREEN_WIDTH}}>
          <View style={[containers.row, {justifyContent: 'center'}]}>
            {this.props.options.map((option, index) => {
              return <ToggleButton
                key={index}
                text={option.text}
                isSelected={option.isSelected}
                toggleSelect={() => {
                  this.props.updateOption(option.id);
                }} />
            })}
          </View>
        </View>
      </View>
    );
  }
}
