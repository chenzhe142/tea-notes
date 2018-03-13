/**
 * IconButton.js
 *
 * ## Function
 * It defines an icon button component,with some default settings.
 * To customize it, simply override the style code.
 *
 * ## Touch event
 *  @param onPress: defines the event when user pressing the button
 *
 * ## PropTypes
 *  @param onForward: configure its forwarding (for navigator) scene
 *  @param style: customized style
 *
 * @zchen
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import text from '../style/text';

const propTypes = {
  iconName: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  onForward: PropTypes.func,
};

export default class IconButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.onForward}>
        <Icon name={this.props.iconName} size={this.props.size} color={this.props.color} />
      </TouchableOpacity>
    );
  }
}

IconButton.propTypes = propTypes;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 2,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
  }
});
