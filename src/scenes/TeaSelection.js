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
  TextInput,
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
import colorScheme from '../style/colorScheme';
import text from '../style/text';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  COVERIMAGE_HEIGHT,
  DEFAULT_TEA_LIST,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  STATUS_BAR_HEIGHT_IOS
} from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class TeaSelection extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._filterTeaList = this._filterTeaList.bind(this);

    this.offset = 0;
    this.defaultTeaList = DEFAULT_TEA_LIST;

    this.state = {
      searchBarStatus: 'show',
      searchIconStatus: 'hide',
      teaLists: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
      filterEnabled: false,
      filterText: '',
    };
  }

  componetWillMount() {
    const teaLists = this._generateTeaList();
    this.setState({ teaLists });
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

    if (currentOffset >= 35) {
      searchBarStatus = 'hide';
      searchIconStatus = 'show';
    } else {
      searchBarStatus = 'show';
      searchIconStatus = 'hide';
    }

    console.log(currentOffset);
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

    const teaLists = ds.cloneWithRows(tempList);
    return teaLists;
  }

  _filterTeaList(searchText) {
    if (searchText.length <= 0) {
      const teaLists = this._generateTeaList();
      this.setState({ teaLists });
      return;
    }

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


    // TODO: filter function needs to be improved!
    // 1. ignore whitespace
    const tempList = mergedTeaList.filter((tea) => {
      let teaMap = new Map();
      let searchMap = new Map();

      for (let char of tea.name) {
        if (teaMap.get(char) === undefined) {
          teaMap.set(char.toUpperCase(), true);
        } else {
          const count = teaMap.get(char);
          teaMap.set(char.toUpperCase(), count + 1);
        }
      }

      for (let char of searchText) {
        if ((teaMap.get(char.toUpperCase()) === undefined) || (teaMap.get(char.toUpperCase() > searchMap.get()))) {
          return;
        }
      }
      return tea;
    }).slice();

    const teaLists = ds.cloneWithRows(tempList);
    return teaLists;
  }

  render() {
    let teaLists;
    if (this.state.filterText.length === 0) {
      teaLists = this._generateTeaList();
    } else {
      filterText = this.state.filterText;
      teaLists = this._filterTeaList(filterText);
    }

    return (
      <View style={containers.container}>
        <StatusBar hidden={false} />
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: colorScheme.color5}}></View>
        <TeaSelectionHeader
          navigator={this.props.navigator}
          searchIconStatus={this.state.searchIconStatus}
        />
        <ScrollView onScroll={this._onScroll} scrollEventThrottle={16} bounces={true}>
          <View>
            <View>
              <View style={styles.searchBar}>
                <View>
                  <TextInput
                    value={this.tea}
                    placeholder='search tea'
                    onFocus={() => {

                    }}
                    style={[text.title, styles.inputBox, {fontSize: 15, fontWeight: '100'}]}
                    onChangeText={(text) => {
                      this.setState({ filterText: text });
                    }}
                  />
                </View>
              </View>
            </View>
            <ListView
              dataSource={teaLists}
              renderRow={(teaObject) =>
                <ImageRow
                  imageSource={{uri: teaObject.coverImageUrl.uri}}
                  tea={teaObject}
                  onPressEvent={() => this._onForward(teaObject)}
                />} />

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

const styles = StyleSheet.create({
  searchBar: {
    width: SCREEN_WIDTH,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  inputBox: {
    width: SCREEN_WIDTH * 0.8,
    // textAlign: 'center',
    height: 25,
    margin: 5,
    borderWidth: 0,
    textAlignVertical: 'center',
    backgroundColor: color.lightGray,
  }
});
