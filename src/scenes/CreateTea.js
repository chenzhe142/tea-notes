/**
 * CreateTea.js
 *
 * @zchen
 */

import React, { Component, PropTypes } from 'react';
import {
  Animated,
  AsyncStorage,
  Image,
  ListView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';
import WithLabel from '../components/WithLabel.js';
import ItemPicker from '../components/ItemPicker.js';

import saveToStorage from '../utils/saveToStorage';
import getFromStorage from '../utils/getFromStorage';

import { SCREEN_WIDTH, SCREEN_HEIGHT, COVERIMAGE_HEIGHT, CARD_OFFSET, CUSTOMIZED_TEA_LIST_STORAGE_KEY } from '../constants';

import text from '../style/text.js';
import color from '../style/color.js';

class Tea {
  constructor({name, temperature, time, coverImageUrl}) {
    this.name = name;
    this.temperature = temperature;
    this.time = time;
    this.coverImageUrl = coverImageUrl;
  }
  isEqual(anotherTea) {
    if ((this.name === anotherTea.name) && (this.temperature === anotherTea.temperature) && (this.time === anotherTea.time)) {
      return true;
    }
    return false;
  }
}

const defaultTea = new Tea({
  name: 'Name of Tea',
  temperature: '95',
  time: '180',
  coverImageUrl: null,
});

export default class CreateTea extends Component {
  constructor(props) {
    super(props);

    this._coverPhotoOnClick = this._coverPhotoOnClick.bind(this);
    this._showTemperaturePicker = this._showTemperaturePicker.bind(this);
    this._showTimePicker = this._showTimePicker.bind(this);
    this._dismissPicker = this._dismissPicker.bind(this);
    this._updateTemperature = this._updateTemperature.bind(this);
    this._updateTime = this._updateTime.bind(this);
    this._saveTea = this._saveTea.bind(this);

    this.state = {
      isCoverImageSelected: false,
      showTemperaturePicker: false,
      showTimePicker: false,

      tea: {
        name: 'Name of Tea',
        temperature: '95',
        time: '180',
        coverImageUrl: null,
      },

      customizedTeaList: {},
    };

    this.temperature = Array.apply(null, {length: 56}).map((element, index) => {
      return String(index + 65);
    });

    this.time = Array.apply(null, {length: 10}).map((element, index) => {
      return String(index + 1);
    });

  };

  _coverPhotoOnClick() {
    const options = {
      title: 'Select Tea photo',
      storageOptions: {
        skipBackup: false,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // or a reference to the platform specific asset location
        let source;
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }

        const tea = Object.assign({}, this.state.tea);
        tea.coverImageUrl = source;

        this.setState({ tea, isCoverImageSelected: true });
      }
    });
  }

  _showTemperaturePicker() {
    this.setState({
      showTemperaturePicker: true,
      showTimePicker: false,
    });
  }

  _showTimePicker() {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: true,
    });
  }

  _dismissPicker() {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: false,
    });
  }

  _updateTemperature(temperature) {
    const tea = Object.assign({}, this.state.tea);
    tea.temperature = temperature;
    this.setState({ tea });
  }

  _updateTime(time) {
    const tea = Object.assign({}, this.state.tea);
    tea.time = time;
    this.setState({ tea });
  }

  _saveTea() {
    // TODO: info validation

    const tea = Object.assign({}, this.state.tea);

    if (defaultTea.isEqual(tea) === false) {
      let customizedTeaList = Object.assign({}, this.state.customizedTeaList);

      if (Object.keys(customizedTeaList).length !== 0) {
        customizedTeaList.customizedTeaList.push(tea);
      } else {
        customizedTeaList = {
          customizedTeaList: [tea],
        };
      }

      saveToStorage(CUSTOMIZED_TEA_LIST_STORAGE_KEY, JSON.stringify(customizedTeaList));
    }
  }

  componentWillMount() {
    this.getData().done();
  }

  async getData() {
    try {
      let value = await AsyncStorage.getItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY);
      if (value !== null){
        const customizedTeaList = JSON.parse(value);
        this.setState({ customizedTeaList });
      }
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  render() {
    let teaCoverPhoto;
    if (this.state.isCoverImageSelected) {
      teaCoverPhoto = <Image source={this.state.tea.coverImageUrl} style={styles.coverImage}/>;
    } else {
      teaCoverPhoto = <Image source={require('../../public/image/photo_placeholder.png')} style={styles.coverImage} />;
    }

    let footer;
    if (this.state.showTemperaturePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.temperature}
                  onValueChangeEvent={this._updateTemperature}
                  values={this.temperature}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    } else if (this.state.showTimePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.time}
                  onValueChangeEvent={this._updateTime}
                  values={this.time}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    } else {
      footer = <View style={styles.stickyFooter}>
                <Button
                  onForward={this._saveTea}
                  btnText="Save"
                  style={{backgroundColor: color.green}} />
              </View>;
    }

    return(
      <View style={styles.container}>
        <BackBtn navigator={this.props.navigator} textStyle={text.p} text="close" />
        <ScrollView>
          <View style={[styles.container, {backgroundColor: color.white, height: SCREEN_HEIGHT}]}>
            <View>
              <TouchableWithoutFeedback onPress={this._coverPhotoOnClick}>
                {teaCoverPhoto}
              </TouchableWithoutFeedback>

              <View style={styles.teaCard}>
                <View style={styles.teaCardContainer}>
                  <View>
                    <TextInput
                      value={this.state.tea.name}
                      style={[text.title, styles.teaCard_title, styles.inputBox]}
                      onChangeText={(name) => this.setState({ name })}
                    />
                  </View>

                  <View>
                    <Text style={[text.p, {color: color.gray}]}>green tea - mild - low caffeine</Text>
                  </View>

                </View>
              </View>
            </View>

            <View style={{alignItems: 'center', marginTop: 10 + CARD_OFFSET}}>
              <Text style={[text.p, {color: color.gray}]}>tap to see in different units of measurements</Text>
            </View>

            <View>
              <View style={[styles.row, {marginTop: 10, marginBottom: 10, backgroundColor: color.white}]}>
                <View>
                  <WithLabel label="🎚" textStyle={text.p} showPicker={this._showTemperaturePicker}>
                    <Text style={[text.number, styles.teaCard_data]}>
                      {this.state.tea.temperature}
                    </Text>
                  </WithLabel>
                </View>
                <View>
                  <WithLabel label="⏳" textStyle={text.p} showPicker={this._showTimePicker}>
                    <Text style={[text.number, styles.teaCard_data]}>
                      {this.state.tea.time}
                    </Text>
                  </WithLabel>
                </View>
              </View>
            </View>
            <View style={[styles.container]}>
              <Text>How to brew</Text>
            </View>
          </View>
        </ScrollView>
        {footer}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  coverImage: {
    height: COVERIMAGE_HEIGHT,
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
  },
  teaCard: {
    position: 'absolute',
    bottom: -CARD_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  teaCardContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: COVERIMAGE_HEIGHT * 0.4,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: color.black,
    shadowOpacity: 0.5,
    borderRadius: 2,
  },
  teaCard_title: {
    width: SCREEN_WIDTH * 0.8,
    textAlign: 'center',

    // text input height
    height: 40,
  },
  teaCard_data: {
    textAlign: 'left',
    width: 50,
    textAlignVertical: 'center',
  },
  inputBox: {
    borderWidth: 0,
    textAlignVertical: 'center',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
