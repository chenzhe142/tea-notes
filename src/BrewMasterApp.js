/**
 * brewMaster.js
 *
 * main app file
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import Main from './scenes/Main.js';
import Setting from './scenes/Setting.js';
import CreateTea from './scenes/CreateTea.js';
import TeaSelection from './scenes/TeaSelection.js';
import TeaDetail from './scenes/TeaDetail.js';
import TeaTimer from './scenes/TeaTimer.js';

import StorageUnit from './utils/StorageUnit';

import BrewMasterTabsView from './BrewMasterTabsView';

import {
  DEFAULT_TEA_LIST,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
  SCENE_TRANSITION_FLOAT_RIGHT,
  SCENE_TRANSITION_FLOAT_LEFT
} from './constants';

const defaultPropTypes = {
  setting: {
    temperature: 'celsius',
    time: 'minute',
    water: 'ml',
  },
  teaLists: DEFAULT_TEA_LIST,
  currentSelectedTea: {},
};

export default class brewMaster extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this._updateCurrentSelectedTea = this._updateCurrentSelectedTea.bind(this);
    this._updateStorage = this._updateStorage.bind(this);

    this.state = {
      setting: {
        temperature: 'celsius',
        time: 'minute',
        water: 'ml',
      },
      currentSelectedTea: {},
      selectedTab: 'Main'
    };

    this.storageUnit = new StorageUnit([CUSTOMIZED_TEA_LIST_STORAGE_KEY, CUSTOMIZED_SETTINGS_STORAGE_KEY], this._updateStorage);
    this.storageUnit.fetchData.then((storage) => {
      this.setState({ storage });
      console.log('lalala');
      console.log(storage);
    });

  }

  _updateCurrentSelectedTea(teaObject) {
    this.setState({
      currentSelectedTea: teaObject,
    });
  }

  _updateStorage(storage) {
    this.setState({ storage });
  }

  _renderScene(route, navigator) {
    switch (route.name) {
      case 'TeaSelection':
        return (<TeaSelection
          {...route}
          navigator={navigator}
          storage={this.state.storage}
          updateCurrentSelectedTea={this._updateCurrentSelectedTea} />);
      case 'Setting':
        return (<Setting
          {...route}
          navigator={navigator}
          storage={this.state.storage}
          storageUnit={this.storageUnit}
          setting={this.state.setting} />);
      case 'TeaDetail':
        return (<TeaDetail
          {...route}
          navigator={navigator}
          storage={this.state.storage}
          currentSelectedTea={this.state.currentSelectedTea}
          setting={this.state.setting} />);
      case 'CreateTea':
        return (<CreateTea
          {...route}
          navigator={navigator}
          storageUnit={this.storageUnit}
          storage={this.state.storage}
          setting={this.state.setting} />);
      case 'TeaTimer':
        return (<TeaTimer
          {...route}
          navigator={navigator}
          setting={this.state.setting}
          storage={this.state.storage}
          currentSelectedTea={this.state.currentSelectedTea} />);
      default:
        return (
          <BrewMasterTabsView
            {...route}
            navigator={navigator}
            storage={this.state.storage}
            storageUnit={this.storageUnit}
            updateCurrentSelectedTea={this._updateCurrentSelectedTea} />
        );
    }
  }
  
  render() {
    return (
      <Navigator
        initialRoute={{ }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromBottom;;
        }}
        renderScene={this._renderScene}
      />

    );
  }
}
