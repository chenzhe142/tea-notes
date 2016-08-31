/**
 * TeaBook iOS entry file
 *
 * @zchen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View
} from 'react-native';

import Main from './src/scenes/Main.js';
import Setting from './src/scenes/Setting.js';
import CreateTea from './src/scenes/CreateTea.js';
import TeaSelection from './src/scenes/TeaSelection.js';
import TeaDetail from './src/scenes/TeaDetail.js';

const BaseConfig = Navigator.SceneConfigs.FloatFromBottom;

class brewMaster extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);

    this.state = {
      settings: {
        temperature: 'celsius',
        time: 'minute',
        water: 'ml',
      },
      teaLists: [{
        name: 'Matcha Green Tea',
        temperature: 95,
        time: 180
      }],
    };
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
          settings={this.state.settings} />);
      case 'TeaDetail':
        return (<TeaDetail
          navigator={navigator} />);
      case 'CreateTea':
        return (<CreateTea
          navigator={navigator} />);

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



AppRegistry.registerComponent('brewMaster', () => brewMaster);
