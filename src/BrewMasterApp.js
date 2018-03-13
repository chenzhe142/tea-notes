/**
 * brewMaster.js
 *
 * main app file
 *
 * @zchen
 */

import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components';

import Setting from './scenes/Setting.js';
import CreateTea from './scenes/CreateTea.js';
import TeaSelection from './scenes/TeaSelection.js';
import TeaDetail from './scenes/TeaDetail.js';
import TeaTimer from './scenes/TeaTimer.js';
import UserFavorite from './scenes/UserFavorite.js';
import AddNote from './scenes/AddNote.js';

import StorageUnit from './utils/StorageUnit';

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
    this._configureScene = this._configureScene.bind(this);
    this._updateCurrentSelectedTea = this._updateCurrentSelectedTea.bind(this);
    this._updateEditingStatus = this._updateEditingStatus.bind(this);
    this._updateStorage = this._updateStorage.bind(this);
    this._updateEditingNoteType = this._updateEditingNoteType.bind(this);
    this._updateBrewSteps = this._updateBrewSteps.bind(this);
    this._updateUserNotes = this._updateUserNotes.bind(this);

    this.state = {
      setting: {
        temperature: 'celsius',
        time: 'minute',
        water: 'ml',
      },
      currentSelectedTea: {},
      isEditing: false,
      noteType: '',
      brewSteps: '',
      userNotes: '',
    };

    this.storageUnit = new StorageUnit([CUSTOMIZED_TEA_LIST_STORAGE_KEY, CUSTOMIZED_SETTINGS_STORAGE_KEY], this._updateStorage);
    this.storageUnit.fetchData.then((storage) => {
      this.setState({ storage });
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

  _updateEditingStatus(editingStatus) {
    this.setState({ isEditing: editingStatus });
  }

  _updateEditingNoteType(noteType) {
    this.setState({ noteType });
  }

  _updateBrewSteps(brewSteps) {
    this.setState({ brewSteps });
  }

  _updateUserNotes(userNotes) {
    this.setState({ userNotes });
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
          storageUnit={this.storageUnit}
          currentSelectedTea={this.state.currentSelectedTea}
          updateCurrentSelectedTea={this._updateCurrentSelectedTea}
          updateEditingStatus={this._updateEditingStatus}
          setting={this.state.setting} />);
      case 'CreateTea':
        return (<CreateTea
          {...route}
          navigator={navigator}
          isEditing={this.state.isEditing}
          updateEditingStatus={this._updateEditingStatus}
          currentSelectedTea={this.state.currentSelectedTea}
          updateCurrentSelectedTea={this._updateCurrentSelectedTea}
          updateEditingNoteType={this._updateEditingNoteType}
          brewSteps={this.state.brewSteps}
          userNotes={this.state.userNotes}
          updateBrewSteps={this._updateBrewSteps}
          updateUserNotes={this._updateUserNotes}
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
      case 'UserFavorite':
        return (<UserFavorite
          navigator={navigator}
          updateCurrentSelectedTea={this._updateCurrentSelectedTea}
          storage={this.state.storage} />);
      case 'AddNote':
        return (<AddNote
          navigator={navigator}
          updateCurrentSelectedTea={this._updateCurrentSelectedTea}
          updateBrewSteps={this._updateBrewSteps}
          updateUserNotes={this._updateUserNotes}
          brewSteps={this.state.brewSteps}
          userNotes={this.state.userNotes}
          noteType={this.state.noteType}
          storage={this.state.storage} />);
      default:
        return;
    }
  }

  _configureScene(route) {
    switch (route.name) {
      case 'Setting':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'CreateTea':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'UserFavorite':
        return Navigator.SceneConfigs.FloatFromBottom;
      case 'TeaTimer':
        return Navigator.SceneConfigs.FloatFromBottom;
      default:
        return Navigator.SceneConfigs.HorizontalSwipeJump;
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'TeaSelection' }}
        configureScene={this._configureScene}
        renderScene={this._renderScene}
      />

    );
  }
}
