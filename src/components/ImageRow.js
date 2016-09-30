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
 *  @param tea: {name, temperature,time}
 *  @param imageSource: `require(path-to-image)`
 *  @param onPressEvent
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import color from '../style/color';
import text from '../style/text';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

const propTypes = {
  tea: PropTypes.shape({
    name: PropTypes.string,
    temperature: PropTypes.string,
    time: PropTypes.string,
  }),
  imageSource: PropTypes.number,
  onPressEvent: PropTypes.func,
};

export default class ImageRow extends Component {

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPressEvent}>
          <Image style={styles.image} source={this.props.imageSource}>
            <View style={[styles.container]}>
              <Text style={[styles.title, text.shadow]}>{this.props.tea.name}</Text>
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
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  }
};
