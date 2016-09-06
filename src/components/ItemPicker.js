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
      selectedValue: this.props.values[this.props.values.length-1],
    };
  }
  render() {
    return (
      <View>
        <View style={styles.bar}>
          <TouchableWithoutFeedback onPress={this.props.dismissPicker}>
            <View>
              <Text style={this.props.textStyle}>Done</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <PickerIOS
            itemStyle={{height:180}}
            selectedValue={this.state.selectedValue}
            onValueChange={(value) => this.setState({selectedValue: value})}>
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
