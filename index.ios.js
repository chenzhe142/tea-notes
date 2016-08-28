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
import TeaSelection from './src/scenes/TeaSelection.js';
import TeaDetail from './src/scenes/TeaDetail.js';

const BaseConfig = Navigator.SceneConfigs.FloatFromBottom;

class brewMaster extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Main', index: 0 }}
        configureScene={(route) => {
          if (route.name !== 'TeaSelection') {
            return Navigator.SceneConfigs.FloatFromBottom;
          } else {
            return Navigator.SceneConfigs.FloatFromRight;;
          }
        }}
        renderScene={(route, navigator) => {
          if (route.name === 'Main') {
            return <Main
              navigator={navigator}
              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  name: 'TeaSelection',
                  index: nextIndex,
                });
              }}
              />;
          }

          if (route.name === 'TeaSelection') {
            return <TeaSelection
              navigator={navigator}
              onForward={ () => {
                const nextIndex = route.index + 1;
                navigator.push({
                  name: 'TeaDetail',
                  index: nextIndex,
                });
              }}
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }} />;
          }

          if (route.name === 'TeaDetail') {
            return <TeaDetail
              onBack={() => {
                if (route.index > 0) {
                  navigator.pop();
                }
              }} />;
          }
        }}
      />
    );
  }
}



AppRegistry.registerComponent('brewMaster', () => brewMaster);
