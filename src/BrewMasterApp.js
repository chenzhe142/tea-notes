/**
 * brewMaster.js
 *
 * main app file
 *
 * @zchen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View
} from 'react-native';

import Main from './scenes/Main.js';
import Setting from './scenes/Setting.js';
import CreateTea from './scenes/CreateTea.js';
import TeaSelection from './scenes/TeaSelection.js';
import TeaDetail from './scenes/TeaDetail.js';

const BaseConfig = Navigator.SceneConfigs.FloatFromBottom;

const propTypes = {};

const defaultPropTypes = {
  setting: {
    temperature: 'celsius',
    time: 'minute',
    water: 'ml',
  },
  teaLists: [{
    name: 'Matcha Green Tea',
    temperature: 95,
    time: 180
  }],
  currentSelectedTea: {},
};

export default class brewMaster extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this._updateCurrentSelectedTea = this._updateCurrentSelectedTea.bind(this);

    this.state = {
      setting: {
        temperature: 'celsius',
        time: 'minute',
        water: 'ml',
      },
      teaLists: [{
        name: 'Matcha Green Tea',
        temperature: 95,
        time: 180
      }],
      currentSelectedTea: {},
    };
  }
  _updateCurrentSelectedTea(teaObject) {
    this.setState({
      currentSelectedTea: teaObject,
    });
  }
  _renderScene(route, navigator) {
    switch (route.name) {
      case 'Main':
        return (<Main navigator={navigator} />);
      case 'TeaSelection':
        return (<TeaSelection
          navigator={navigator}
          teaLists={this.state.teaLists} />);
      case 'Setting':
        return (<Setting
          navigator={navigator}
          setting={this.state.setting} />);
      case 'TeaDetail':
        return (<TeaDetail
          navigator={navigator}
          currentSelectedTea={this.state.currentSelectedTea}
          setting={this.state.setting} />);
      case 'CreateTea':
        return (<CreateTea
          navigator={navigator}
          setting={this.state.setting} />);

      default: return;
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Main', index: 0 }}
        configureScene={(route) => {
          if (route.name === 'TeaSelection') {
            return Navigator.SceneConfigs.FloatFromRight;
          } else {
            return Navigator.SceneConfigs.FloatFromBottom;;
          }
        }}
        renderScene={this._renderScene} />
    );
  }
}