/**
 * ItemPicker.js
 *
 * ## Function
 *
 * ## Touch Event
 *
 * ## PropTypes
 *
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  PickerIOS,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

import Button from './Button';

import color from '../style/color';

import { SCREEN_WIDTH } from '../constants';

const propTypes = {
  values: PropTypes.array,
  dismissPicker: PropTypes.func,
};

export default class ItemPicker extends Component {
  render() {
    return (
      <View>
        <View>
          <Button
            onForward={this.props.dismissPicker}
            btnText="Done"
            enableButtonStyle={true}
            style={{backgroundColor: color.pink, marginBottom: 0, borderWidth: 0, width: SCREEN_WIDTH}}
          />
        </View>
        <View style={{backgroundColor: color.white}}>
          <PickerIOS
            itemStyle={{height:180}}
            selectedValue={this.props.selectedValue}
            onValueChange={(value) => this.props.onValueChangeEvent(value)}>
            {this.props.values.map((value, index) => {
              return <PickerIOS.Item label={value} value={value} key={index} />
            })}
          </PickerIOS>
        </View>
      </View>
    );
  }
}

ItemPicker.propTypes = propTypes;
