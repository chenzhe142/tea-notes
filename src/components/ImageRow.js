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
 *  @param {object} tea {name, temperature,time}
 *  @param {string} imageSource `require(path-to-image)`
 *  @param {function} onPressEvent
 *
 * @zchen
 */

import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import containers from '../style/containers';
import color from '../style/color';
import colorScheme from '../style/colorScheme';
import text from '../style/text';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../constants';


export default class ImageRow extends Component {
  render() {
    let tag;
    if (this.props.tea.addedByMe) {
      tag =
      <View style={styles.addedByMeView}>
        <View style={[containers.container, {justifyContent: 'center', alignItems: 'center'}]}>
          <Text style={[text.p, styles.tagText]}>Added by me</Text>
        </View>
      </View>
    }
    // } else if (this.props.tea.staffPick) {
    //   tag =
    //   <View style={styles.staffPickView}>
    //     <View style={[containers.container, {justifyContent: 'center', alignItems: 'center'}]}>
    //       <Text style={[text.p, styles.tagText]}>Staff pick</Text>
    //     </View>
    //   </View>
    // }



    return (
      <View>
        <TouchableWithoutFeedback onPress={this.props.onPressEvent}>
          <View style={{borderBottomWidth: 1, borderBottomColor: 'white'}}>
            <Image style={styles.image} source={this.props.imageSource}>
              {tag}
              <View style={[containers.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={[text.title, text.shadow, {color: color.white, fontWeight: '700', backgroundColor: 'rgba(0,0,0,0)'}]}>{this.props.tea.name}</Text>
              </View>
            </Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = {
  image: {
    height: parseInt(SCREEN_HEIGHT / 5) + 10,
    width: SCREEN_WIDTH,
  },
  addedByMeView: {
    backgroundColor: 'rgba(244,139,148,0.9)',
    borderRadius: 4,
    height: 22,
    left: 8,
    position: 'absolute',
    top: 8,
    width: 90,
  },
  staffPickView: {
    backgroundColor: 'rgba(102,153,255,0.9)',
    borderRadius: 4,
    height: 22,
    left: 8,
    position: 'absolute',
    top: 8,
    width: 90,
  },
  tagText: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: color.white,
    fontSize: 12,
    fontWeight: '400',
  },
};
