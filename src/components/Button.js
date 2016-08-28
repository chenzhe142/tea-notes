import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

export default class Button extends Component {
  static PropTypes = {
    btnText: PropTypes.string,
    onForward: PropTypes.func,
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.onForward}>
        <Text style={styles.text}>
          { this.props.btnText }
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 2,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
