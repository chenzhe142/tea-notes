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

const SCREEN_WIDTH = Dimensions.get('window').width;

const propTypes = {
  values: PropTypes.array,
};

export default class ItemPicker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View>
          <Button
            onForward={this.props.dismissPicker}
            btnText="Done"
            style={{backgroundColor: 'rgb(255,127,124)', borderWidth: 0, width: SCREEN_WIDTH}}
          />
        </View>
        <View>
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

const color = StyleSheet.create({
  black: {
    color: 'black',
  },
  gray: {
    color: 'rgb(102,102,102)',
  }
})

const styles = {
  bar: {
    backgroundColor: color.gray,
    flexDirection: 'row',
    justifyContent: 'center',
  }
}

ItemPicker.propTypes = propTypes;
