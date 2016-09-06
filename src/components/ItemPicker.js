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
 Picker,
 TouchableWithoutFeedback,
 View
} from 'react-native';

const propTypes = {
  values: PropTypes.array,
};

export default class ItemPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: this.props.values[0],
    };
  }
  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.selectedValue}
          onValueChange={(value) => this.setState({selectedValue: value})}>
          {this.props.values.map((value, index) => {
            return <Picker.Item label={value} value={value} key={index} />
          })}
        </Picker>
      </View>
    );
  }
}

ItemPicker.propTypes = propTypes;
