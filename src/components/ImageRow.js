/**
 * ImageRow.js
 *
 * ## Function
 * This is used in TeaSelection scene, showing a list of teas' pictures as background,
 * with tea's name on mid-center of the image.
 *
 * ## Touch event
 * when touching the object, it will open TeaDetail scene, showing the details of
 * this selected tea.
 *
 * ## PropTypes
 *  @tea: {name, temperature,time}
 *  @imageSource: `require(path-to-image)`
 *  @onPressEvent
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  Dimensions,
  Image,
  Navigator,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
    height: 150,
    width: SCREEN_WIDTH,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 5,
    textAlign: 'center',
  }
};
