/**
 * BrewMasterTabsView.js
 *
 * main app file
 *
 * @zchen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Text,
  View,
  TabBarIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Main from './scenes/Main.js';
import Setting from './scenes/Setting.js';
import CreateTea from './scenes/CreateTea.js';
import TeaSelection from './scenes/TeaSelection.js';
import TeaDetail from './scenes/TeaDetail.js';
import TeaTimer from './scenes/TeaTimer.js';

import color from './style/color';

import {
  DEFAULT_TEA_LIST,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  SCENE_TRANSITION_FLOAT_RIGHT,
  SCENE_TRANSITION_FLOAT_LEFT
} from './constants';

const BaseConfig = Navigator.SceneConfigs.FloatFromBottom;

const propTypes = {};

const defaultPropTypes = {
  setting: {
    temperature: 'celsius',
    time: 'minute',
    water: 'ml',
  },
  teaLists: DEFAULT_TEA_LIST,
  currentSelectedTea: {},
};


export default class BrewMasterTabsView extends Component {
  constructor(props) {
    super(props);

    this.onTabSelect = this.onTabSelect.bind(this);
    this.state = {
      selectedTab: 'TeaSelection',
    };
  }

  onTabSelect(tab) {
    if (this.state.selectedTab !== tab) {
      this.setState({
        selectedTab: tab
      });
    }
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor={color.gray}
        tintColor={color.black}
        barTintColor={color.navbarGray}>
        <Icon.TabBarItemIOS
          title="Tea List"
          iconName="ios-list-box-outline"
          selectedIconName="ios-list-box"
          selected={this.state.selectedTab === 'TeaSelection'}
          onPress={() => this.onTabSelect('TeaSelection')}
        >
          <TeaSelection
            navigator={this.props.navigator}
            storage={this.props.storage}
            updateCurrentSelectedTea={this.props.updateCurrentSelectedTea} />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="New Note"
          iconName="ios-create-outline"
          selectedIconName="ios-create"
          selected={this.state.selectedTab === 'CreateTea'}
          onPress={() => {
            const prevTab = this.state.selectedTab;
            this.setState({
              selectedTab: 'CreateTea'
            });
            this.props.navigator.push({
              name: 'CreateTea'});
            this.setState({
              selectedTab: prevTab
            });
          }}
        >
          <Setting />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Setting"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          selected={this.state.selectedTab === 'Setting'}
          onPress={() => this.onTabSelect('Setting')}
        >
          <Setting
            storage={this.props.storage}
            storageUnit={this.props.storageUnit}
            />
        </Icon.TabBarItemIOS>
      </TabBarIOS>

    );
  }
}
