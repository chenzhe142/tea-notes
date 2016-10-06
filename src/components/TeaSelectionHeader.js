/**
 * TeaSelectionHeader.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  ListView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
        <View style={{height: 44, backgroundColor: colorScheme.color1}}>
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
              <IconButton
                iconName="search"
                size={20}
                color={color.white}
                onForward={() => {
                  this.props.navigator.push({
                    name: 'Setting',
                  });
                }} />
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
