/**
 * TeaSelection.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ImageRow from '../components/ImageRow.js'
import IconButton from '../components/IconButton.js'
import BackBtn from '../components/BackBtn.js';
import TeaSelectionHeader from '../components/TeaSelectionHeader.js';

import containers from '../style/containers.js';
import color from '../style/color';
import text from '../style/text';

import { DEFAULT_TEA_LIST, CUSTOMIZED_TEA_LIST_STORAGE_KEY, STATUS_BAR_HEIGHT_IOS } from '../constants';

export default class TeaSelection extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this._onScroll = this._onScroll.bind(this);

    this.offset = 0;
    this.defaultTeaList = DEFAULT_TEA_LIST;

    this.state = {
      searchBarStatus: 'show',
      searchIconStatus: 'hide',
    };
  }

  _onForward(teaObject) {
    // update parent state 'currentSelectedTea'
    this.props.updateCurrentSelectedTea(teaObject);
    this.props.navigator.push({
      name: 'TeaDetail',
    });
  }

  _onScroll(event) {
    const currentOffset = event.nativeEvent.contentOffset.y;
    let searchBarStatus;
    let searchIconStatus

    if (currentOffset >= 20) {
      searchBarStatus = 'hide';
      searchIconStatus = 'show';
    } else {
      searchBarStatus = 'show';
      searchIconStatus = 'hide';
    }

    this.setState({ searchBarStatus, searchIconStatus });
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
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: color.pink}}></View>
        <TeaSelectionHeader
          navigator={this.props.navigator}
          searchIconStatus={this.state.searchIconStatus}
        />

        <ScrollView onScroll={this._onScroll} scrollEventThrottle={100} bounces={true}>
          <View>
            <View style={{height: 20, backgroundColor: color.pink}}>
              <Text>lalala</Text>
            </View>
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
        <View style={[containers.stickyFooter, {alignItems: 'center'}]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigator.push({
                name: 'CreateTea',
              });
            }}>
            <Icon name="plus-circle" size={40} color={color.green} backgroundColor={color.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
