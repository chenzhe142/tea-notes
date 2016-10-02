/**
 * TeaSelectionHeader.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  ListView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import IconButton from '../components/IconButton.js'

import containers from '../style/containers.js';
import color from '../style/color';
import colorScheme from '../style/colorScheme';
import text from '../style/text';

export default class TeaSelectionHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let searchIcon;
    if (this.props.searchIconStatus === 'show') {
      searchIcon = <IconButton
        iconName="search"
        size={20}
        color={color.white}
        onForward={() => {
          this.props.navigator.push({
            name: 'Setting',
          });
        }} />
    }

    return (
      <View>
        <View style={{height: 40, backgroundColor: colorScheme.color5}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <View style={[containers.row, {justifyContent: 'flex-start'}]}>
              <IconButton
                iconName="cog"
                size={20}
                color={color.white}
                onForward={() => {
                  this.props.navigator.push({
                    name: 'Setting',
                  });
                }} />
            </View>
            <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[text.title, {color: color.white}]}>Tea Notes</Text>
            </View>
            <View style={[containers.row, {justifyContent: 'flex-end'}]}>
                {searchIcon}
                <IconButton
                  iconName="star"
                  size={20}
                  color={color.white}
                  style={{marginLeft: 20}}
                  onForward={() => {
                    this.props.navigator.push({
                      name: 'UserFavorite',
                    });
                  }} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
