import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class TopBtn extends Component {
  render() {
    return (
      <View style={[this.props.style, {backgroundColor: 'rgba(0,0,0,0)'}]}>
        <TouchableOpacity onPress={this.props.onPressEvent}>
          <View>
            <Icon name={this.props.iconName} size={20} color="#ffffff" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
