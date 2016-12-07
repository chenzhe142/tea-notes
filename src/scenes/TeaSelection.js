/**
 * TeaSelection.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  ListView,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImageRow from '../components/ImageRow.js'
import IconButton from '../components/IconButton.js'
import BackBtn from '../components/BackBtn.js';
import TeaSelectionHeader from '../components/TeaSelectionHeader.js';

import containers from '../style/containers.js';
import color from '../style/color';
import colorScheme from '../style/colorScheme';
import text from '../style/text';

import generateFilteredTeaList from '../utils/generateFilteredTeaList.js';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  DEFAULT_TEA_LIST,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  STATUS_BAR_HEIGHT_IOS
} from '../constants';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});



export default class TeaSelection extends Component {
  state = {
    filterText: '',
  }

  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this._filterTeaList = this._filterTeaList.bind(this);
    this._updateFilterText = this._updateFilterText.bind(this);

    this.defaultTeaList = DEFAULT_TEA_LIST;
  }

  _onForward(teaObject) {
    // update parent state 'currentSelectedTea'
    console.log('onForward event');
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

    // use helper function to filter tea lists
    const filteredTeaList = generateFilteredTeaList(searchText, mergedTeaList);
    const teaLists = ds.cloneWithRows(filteredTeaList);
    return teaLists;
  }

  _updateFilterText(filterText) {
    this.setState({ filterText });
  }

  render() {
    let teaLists;
    if (this.state.filterText.length > 0) {
      filterText = this.state.filterText;
      teaLists = this._filterTeaList(filterText);
    } else {
      teaLists = this._generateTeaList();
    }

    let navigatorHeader =

      <View style={{height: 44, backgroundColor: colorScheme.color1}}>
          <Animatable.View ref="view1" style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
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
                  this.refs.view1.fadeOutLeft(200).then((endState) => {
                    this.setState({ showSearchBar: true });
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
          </Animatable.View>
      </View>



    if (this.state.showSearchBar === true) {
      navigatorHeader =
        <View style={{height: 44, backgroundColor: colorScheme.color1}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <Animatable.View ref="view2">
              <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                <View>
                  <Icon name="search" size={20} color={color.white} />
                </View>
                <TextInput
                  value={this.props.filterText}
                  placeholder='search tea notes...'
                  autoFocus={true}
                  style={[text.title, styles.inputBox, {fontSize: 15, fontWeight: '100'}]}
                  onChangeText={(text) => {
                    this._updateFilterText(text);
                  }}
                />
              </View>
            </Animatable.View>
            <View style={[containers.row, {justifyContent: 'flex-end', alignItems: 'center'}]}>
              <TouchableOpacity onPress={() => {
                this.refs.view2.fadeOutRight(200).then((endState) => {
                  this.setState({ showSearchBar: false });
                  this._updateFilterText('');
                });
              }}>
                <Text style={[text.p, {color: color.white}]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

    }

    return (
      <View style={[containers.container, {backgroundColor: colorScheme.color1}]}>
        <StatusBar hidden={false} />
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: colorScheme.color1}}></View>
        <View>{navigatorHeader}</View>
        <ScrollView bounces={true}>
          <View style={{backgroundColor: color.white}}>
            <ListView
              enableEmptySections={true}
              dataSource={teaLists}
              renderRow={(teaObject) =>
                <ImageRow
                  imageSource={{uri: teaObject.coverImageUrl.uri}}
                  tea={teaObject}
                  onPressEvent={() => this._onForward(teaObject)}
                />} />

          </View>
        </ScrollView>
        <View style={[containers.stickyFooter, {alignItems: 'center', paddingBottom: 10}]}>
          <TouchableOpacity
            style={[{backgroundColor: 'rgba(0,0,0,0)'}, text.shadow]}
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
    height: 24,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    borderWidth: 0,
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  }
});
