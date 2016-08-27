import React, { Component, PropTypes } from 'react';
import { Navigator, Text, Image, TouchableOpacity, View } from 'react-native';

export default class ImageRow extends Component {
  static propTypes = {
    tea: PropTypes.shape({
      name: PropTypes.string,
      temperature: PropTypes.number,
      time: PropTypes.number,
    }),
    imageSource: PropTypes.number,
    onPressEvent: PropTypes.func,
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPressEvent}>
          <Image style={styles.image} source={this.props.imageSource}>
            <View style={styles.container}>
              <Text style={styles.title}>{this.props.tea.name.toUpperCase()}</Text>
            </View>
          </Image>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  image: {
    width: null,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    fontFamily: 'Open Sans'
  }
};
