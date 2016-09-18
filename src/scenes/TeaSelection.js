/**
 * TeaSelection.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  ListView,
  StatusBar,
  Text,
  View
} from 'react-native';

import ImageRow from '../components/ImageRow.js'
import IconButton from '../components/IconButton.js'
import BackBtn from '../components/BackBtn.js';

import containers from '../style/containers.js';
import color from '../style/color';
import text from '../style/text';

import { DEFAULT_TEA_LIST, CUSTOMIZED_TEA_LIST_STORAGE_KEY } from '../constants';

export default class TeaSelection extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);

    this.defaultTeaList = DEFAULT_TEA_LIST;
  }

  _onForward(teaObject) {
    // update parent state 'currentSelectedTea'
    this.props.updateCurrentSelectedTea(teaObject);
    this.props.navigator.push({
      name: 'TeaDetail',
    });
  }

  _generateTeaList() {
    // 1. merge customizedTeaList and defaultTeaList
    // 2. sort based on alphabet on tea.name
    // *sanity check: make sure this.state.customizedTeaList is not empty
    let mergedTeaList;

    if (this.props.storage !== undefined) {
      if (this.props.storage[CUSTOMIZED_TEA_LIST_STORAGE_KEY].content !== undefined) {
        mergedTeaList = [...this.defaultTeaList, ...this.props.storage[CUSTOMIZED_TEA_LIST_STORAGE_KEY].content];
      } else {
        mergedTeaList = Object.assign([], this.defaultTeaList);
      }
    } else {
      mergedTeaList = Object.assign([], this.defaultTeaList);
    }

    const tempList = mergedTeaList.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }).slice();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const teaLists = ds.cloneWithRows(tempList);
    return teaLists;
  }

  render() {
    const teaLists = this._generateTeaList();

    return (
      <View style={containers.container}>
        <StatusBar hidden={false} />
        <View style={{height: 10, backgroundColor: color.navbarGray}}>
        </View>
        <View style={{height: 48, backgroundColor: color.navbarGray}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <View style={[containers.row, {justifyContent: 'flex-start'}]}>
              <IconButton
                iconName="ios-settings-outline"
                size={20}
                onForward={() => {
                  this.props.navigator.push({
                    name: 'Setting',
                  });
                }} />
            </View>
            <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={text.title}>Tea Notes</Text>
            </View>
            <View style={[containers.row, {justifyContent: 'flex-end'}]}>
              <IconButton
                iconName="ios-search-outline"
                size={20}
                onForward={() => {
                  this.props.navigator.push({
                    name: 'Setting',
                  });
                }} />
                <IconButton
                  iconName="ios-time-outline"
                  size={20}
                  style={{marginLeft: 20}}
                  onForward={() => {
                    this.props.navigator.push({
                      name: 'Setting',
                    });
                  }} />
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <ListView
              dataSource={teaLists}
              renderRow={(teaObject) =>
                <ImageRow
                  imageSource={{uri: teaObject.coverImageUrl.uri}}
                  tea={teaObject}
                  onPressEvent={() => this._onForward(teaObject)}
                />} />
            <ImageRow
              imageSource={require('../../public/image/puer-tea.png')}
              tea={{name:"pu-er tea"}}
            />
            <ImageRow
              imageSource={require('../../public/image/tieguanyin.jpg')}
              tea={{name:"tie guan yin"}}
            />
            <ImageRow
              imageSource={require('../../public/image/jinjunmei.jpg')}
              tea={{name:"jin jun mei black tea"}}
            />
            <ImageRow
              imageSource={require('../../public/image/matcha-green-tea.png')}
              tea={{name:"matcha green tea"}}
            />
          </View>
        </ScrollView>
        <View style={[containers.stickyFooter, {backgroundColor: color.green}]}>
          <IconButton
            iconName="ios-add-circle-outline"
            size={40}
            onForward={() => {
              this.props.navigator.push({
                name: 'CreateTea',
              });
            }} />
        </View>
      </View>
    );
  }
}
