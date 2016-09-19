/**
 * UserFavorite.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View
} from 'react-native';

import BackBtn from '../components/BackBtn';
import IconButton from '../components/IconButton';
import SlideSwitch from '../components/SlideSwitch';

import text from '../style/text';
import color from '../style/color';
import containers from '../style/containers';

import { STATUS_BAR_HEIGHT_IOS } from '../constants';

export default class UserFavorite extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[containers.container, {justifyContent: 'flex-start', backgroundColor: color.white}]}>
        <StatusBar hidden={false} />
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: color.pink}}></View>
        <View style={{height: 48, backgroundColor: color.pink}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <View style={[containers.row, {justifyContent: 'flex-start'}]}>
              <IconButton
                iconName="times"
                size={20}
                color={color.white}
                onForward={() => {
                  this.props.navigator.pop();
                }} />
            </View>
            <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[text.title, {color: color.white}]}>My Favorite</Text>
            </View>
            <View style={[containers.row, {justifyContent: 'flex-end'}]}>
            </View>
          </View>
        </View>
        <View style={containers.container, {justifyContent: 'flex-start'}}>

        </View>
      </View>
    );
  }
}
