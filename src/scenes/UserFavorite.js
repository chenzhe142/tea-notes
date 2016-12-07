/**
 * UserFavorite.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import IconButton from '../components/IconButton';
import SlideSwitch from '../components/SlideSwitch';
import ImageRow from '../components/ImageRow';

import text from '../style/text';
import color from '../style/color';
import colorScheme from '../style/colorScheme';
import containers from '../style/containers';

import { STATUS_BAR_HEIGHT_IOS, CUSTOMIZED_TEA_LIST_STORAGE_KEY } from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class UserFavorite extends Component {
  constructor(props) {
    super(props);
    this._getFavoriteTeaList = this._getFavoriteTeaList.bind(this);
  }

  _onForward(teaObject) {
    // update parent state 'currentSelectedTea'
    this.props.updateCurrentSelectedTea(teaObject);
    this.props.navigator.push({
      name: 'TeaDetail',
    });
  }

  _getFavoriteTeaList() {
    let favoriteTealist = [];

    if (this.props.storage[CUSTOMIZED_TEA_LIST_STORAGE_KEY]) {
      if (this.props.storage[CUSTOMIZED_TEA_LIST_STORAGE_KEY].content) {
        const customizedTeaList = this.props.storage[CUSTOMIZED_TEA_LIST_STORAGE_KEY].content;
        for (let i = 0; i < customizedTeaList.length; i++) {
          if (customizedTeaList[i].isLiked) {
            favoriteTealist.push(customizedTeaList[i]);
          }
        }
      }
    }

    return ds.cloneWithRows(favoriteTealist);
  }

  render() {
    const favoriteTealist = this._getFavoriteTeaList();

    return (
      <View style={[containers.container, {justifyContent: 'flex-start', backgroundColor: color.white}]}>
        <StatusBar hidden={false} />
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: colorScheme.color1}}></View>
        <View style={{height: 44, backgroundColor: colorScheme.color1}}>
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
          <ListView
            enableEmptySections={true}
            dataSource={favoriteTealist}
            renderRow={(teaObject) =>
              <ImageRow
                imageSource={{uri: teaObject.coverImageUrl.uri}}
                tea={teaObject}
                onPressEvent={() => this._onForward(teaObject)}
              />} />
        </View>
      </View>
    );
  }
}
