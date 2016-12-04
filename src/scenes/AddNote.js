/**
 * AddNote.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';
import WithLabel from '../components/WithLabel.js';
import ItemPicker from '../components/ItemPicker.js';
import IconButton from '../components/IconButton';

import {
  CARD_OFFSET,
  COVERIMAGE_HEIGHT,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT_IOS,
} from '../constants';

import text from '../style/text.js';
import color from '../style/color.js';
import colorScheme from '../style/colorScheme';
import containers from '../style/containers.js';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this._saveNote = this._saveNote.bind(this);
    this.state = {
      brewSteps: '',
      userNotes: '',
    };
  }

  componentDidMount() {
    this.setState({
      brewSteps: this.props.brewSteps,
      userNotes: this.props.userNotes
    });
  }

  _saveNote() {
    // TODO: validate user input?

    if (this.props.noteType === 'brewSteps') {
      this.props.updateBrewSteps(this.state.brewSteps);
      if (this.state.brewSteps !== '') {
        console.log('show brew steps saved modal?');
      }
    } else if (this.props.noteType === 'userNotes') {
      this.props.updateUserNotes(this.state.userNotes);
      if (this.state.userNotes !== '') {
        console.log('show user notes saved modal?');
      }
    }
  }

  render() {
    let userInput;
    if (this.props.noteType === 'brewSteps') {
      userInput = this.state.brewSteps;
    } else if (this.props.noteType === 'userNotes') {
      userInput = this.state.userNotes;
    }

    return (
      <View style={containers.container}>
        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: colorScheme.color1}}></View>
        <View style={{height: 44, backgroundColor: colorScheme.color1}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <View style={[containers.row, {justifyContent: 'flex-start'}]}>
              <IconButton
                iconName="times"
                size={20}
                color={color.white}
                onForward={() => {
                  this.props.navigator.pop();
                }} />
            </View>
            <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[text.title, {color: color.white}]}>Edit note</Text>
            </View>
            <View style={[containers.row, {justifyContent: 'flex-end'}]}>
              <Button
                enableButtonStyle={false}
                btnText="save"
                textStyle={{fontWeight: 'normal'}}
                onForward={() => {
                  this._saveNote();
                  this.props.navigator.pop();
                }} />
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={[containers.container, {justifyContent: 'flex-start', height: SCREEN_HEIGHT - 40 - STATUS_BAR_HEIGHT_IOS, backgroundColor: color.white, paddingBottom: 60}]}>
            <View style={{paddingTop: 0, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
              <TextInput
                placeholder="your note starts from here..."
                multiline={true}
                autoFocus={true}
                value={userInput}
                onChangeText={(userInput) => {
                  if (this.props.noteType === 'brewSteps') {
                    this.setState({ brewSteps: userInput });
                  } else if (this.props.noteType === 'userNotes') {
                    this.setState({ userNotes: userInput });
                  }
                }}
                style={[text.p, {height: SCREEN_HEIGHT/2}]}
                />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
