/**
 * CreateTea.js
 *
 * @zchen
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';
import WithLabel from '../components/WithLabel.js';
import ItemPicker from '../components/ItemPicker.js';
import IconButton from '../components/IconButton';

import NotificationModal from '../modals/NotificationModal.js';

import {
  CARD_BETWEEN_DISTANCE,
  CARD_OFFSET,
  COVERIMAGE_HEIGHT,
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  DEFAULT_SETTINGS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  STATUS_BAR_HEIGHT_IOS,
  SYMBOL_CELSIUS,
  SYMBOL_FAHRENHEIT,
  SYMBOL_MINUTE,
  SYMBOL_SECOND,
  TEA_CAFFEINE_LEVEL,
  TEA_FLAVOR,
  TEA_TYPE,
} from '../constants';

import text from '../style/text.js';
import color from '../style/color.js';
import colorScheme from '../style/colorScheme';
import containers from '../style/containers.js';

import findSelectedSettingOption from '../utils/findSelectedSettingOption';
import noteQualifyToBeCreated from '../utils/noteQualifyToBeCreated';

/**
 * class CreateTea
 */

export default class CreateTea extends Component {

  state = {
    isCoverImageSelected: false,
    showTemperaturePicker: false,
    showTimePicker: false,
    showTeaTypePicker: false,
    showTeaFlavorPicker: false,
    showTeaCaffeineLevelPicker: false,

    tea: {
      id: 0,
      name: '',
      temperature: 80,
      time: 60,
      teaType: 'tea type',
      teaFlavor: 'flavor',
      teaCaffeineLevel: 'caffeine level',
      coverImageUrl: {
        uri: '',
        isStatic: true
      },
      brewSteps: '',
      userNotes: '',
      rating: 0,
    },

    customizedTeaList: this.props.storage[CUSTOMIZED_TEA_LIST_STORAGE_KEY],

    screenOffset: 0,

    notificationModalVisible: false,
    inputValidationNotificationModalVisible: false,
  }

  constructor(props) {
    super(props);
    this.placeholders = {
      name: 'Name of Tea',
      temperature: 'temp',
      time: 'time'
    };

    this.teaType = TEA_TYPE;
    this.teaFlavor = TEA_FLAVOR;
    this.teaCaffeineLevel = TEA_CAFFEINE_LEVEL;

    this.settings = DEFAULT_SETTINGS;
    if (this.props.storage) {
      if (this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content) {
        this.settings = this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content;
      }
    }

  };

  componentWillMount() {
    if (this.props.isEditing) {
      this.setState({
        tea: this.props.currentSelectedTea
      });
      this.props.updateBrewSteps(this.props.currentSelectedTea.brewSteps);
      this.props.updateUserNotes(this.props.currentSelectedTea.userNotes);
    }
  }

  // works like magic!
  componentWillReceiveProps(nextProps) {
    const tea = Object.assign({}, this.state.tea);
    tea.brewSteps = nextProps.brewSteps;
    tea.userNotes = nextProps.userNotes;
    this.setState({ tea });
  }

  _coverPhotoOnClick = () => {
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
          source = {
            uri: response.uri.replace('file://', ''), 
            isStatic: true,
          };
        } else {
          source = {
            uri: response.uri, 
            isStatic: true,
          };
        }

        // get relative image path
        // see issue: https://github.com/marcshilling/react-native-image-picker/issues/107
        const splittedImagePath = source.uri.split('/');
        const relativeImagePath = '~/Documents/images/' + splittedImagePath[splittedImagePath.length-1];
        source.uri = relativeImagePath;

        const tea = Object.assign({}, this.state.tea);
        tea.coverImageUrl = source;

        this.setState({ tea, isCoverImageSelected: true });
      }
    });
  }

  _showTemperaturePicker = () => {
    this.setState({
      showTemperaturePicker: true,
      showTimePicker: false,
      showTeaTypePicker: false,
      showTeaFlavorPicker: false,
      showTeaCaffeineLevelPicker: false,
    });
  }

  _showTimePicker = () => {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: true,
      showTeaTypePicker: false,
      showTeaFlavorPicker: false,
      showTeaCaffeineLevelPicker: false,
    });
  }

  _showTeaTypePicker = () => {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: false,
      showTeaTypePicker: true,
      showTeaFlavorPicker: false,
      showTeaCaffeineLevelPicker: false,
    });
  }

  _showTeaFlavorPicker = () => {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: false,
      showTeaTypePicker: false,
      showTeaFlavorPicker: true,
      showTeaCaffeineLevelPicker: false,
    });
  }

  _showTeaCaffeineLevelPicker = () => {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: false,
      showTeaTypePicker: false,
      showTeaFlavorPicker: false,
      showTeaCaffeineLevelPicker: true,
    });

  }

  _dismissPicker = () => {
    this.setState({
      showTemperaturePicker: false,
      showTimePicker: false,
      showTeaTypePicker: false,
      showTeaFlavorPicker: false,
      showTeaCaffeineLevelPicker: false,
    });
  }

  _openBrewStepsCreatingView = () => {
    this.props.navigator.push({ name: 'AddNote' });
    this.props.updateEditingNoteType('brewSteps');
  }

  _openBrewStepsEditingView = () => {
    this.props.navigator.push({ name: 'AddNote' });
    this.props.updateEditingNoteType('brewSteps');
  }

  _openUserNotesCreatingView = () => {
    this.props.navigator.push({ name: 'AddNote' });
    this.props.updateEditingNoteType('userNotes');
  }

  _openUserNotesEditingView = () => {
    this.props.navigator.push({ name: 'AddNote' });
    this.props.updateEditingNoteType('userNotes');
  }

  _updateTemperature = (temperature) => {
    const tea = Object.assign({}, this.state.tea);
    tea.temperature = temperature;
    this.setState({ tea });
  }

  _updateTime = (time) => {
    const tea = Object.assign({}, this.state.tea);
    tea.time = time;
    this.setState({ tea });
  }

  _updateTeaType = (teaType) => {
    const tea = Object.assign({}, this.state.tea);
    tea.teaType = teaType;
    this.setState({ tea });
  }

  _updateTeaFlavor = (teaFlavor) => {
    const tea = Object.assign({}, this.state.tea);
    tea.teaFlavor = teaFlavor;
    this.setState({ tea });
  }

  _updateTeaCaffeineLevel = (teaCaffeineLevel) => {
    const tea = Object.assign({}, this.state.tea);
    tea.teaCaffeineLevel = teaCaffeineLevel;
    this.setState({ tea });
  }

  _saveTea = () => {
    let tea = Object.assign({}, this.state.tea);
    tea.addedByMe = true;

    if (noteQualifyToBeCreated(tea)) {
      let existingList = Object.assign({}, this.state.customizedTeaList);

      let customizedTeaList;
      if ((existingList.content !== undefined) && (existingList.content.length > 0)) {
        customizedTeaList = Object.assign([], existingList.content);
        tea.id = customizedTeaList[customizedTeaList.length-1].id + 1;
        customizedTeaList.push(tea);
      } else {
        tea.id = 0;
        customizedTeaList = [tea];
      }

      this.props.storageUnit.saveItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY, JSON.stringify(customizedTeaList));

      //show notification modal: "note saved"
      this.setState({ notificationModalVisible: true });

      this.props.navigator.pop();
      this._clearCache();
    } else {
      console.log('please select a photo & enter the name of tea');

      // show notification modal, and close after 1 second
      this.setState({ inputValidationNotificationModalVisible: true });

      setTimeout(() => {
        this.setState({ inputValidationNotificationModalVisible: false });
      }, 1000);
    }
  }

  _updateTea = () => {
    const tea = Object.assign({}, this.state.tea);
    this.props.storageUnit.updateItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY, tea);
    this.props.updateCurrentSelectedTea(tea);

    //show notification modal: "note saved"
    this.setState({ notificationModalVisible: true });

    this.props.navigator.pop();
    this._clearCache();
  }

  _clearCache = () => {
    this.props.updateEditingStatus(false);
    this.props.updateBrewSteps('');
    this.props.updateUserNotes('');
  }

  render() {
    // get user settings
    const temperatureOption = findSelectedSettingOption(this.settings.temperatureOptions);
    const timeOption = findSelectedSettingOption(this.settings.timeOptions);

    let temperatureSymbol, temperaturePickerValue;
    if (temperatureOption === "celsius") {
      temperatureSymbol = SYMBOL_CELSIUS;
      temperaturePickerValue = Array.apply(null, {length: 100}).map((element, index) => {
        return String(index + 1);
      });
    } else {
      temperatureSymbol = SYMBOL_FAHRENHEIT;
      temperaturePickerValue = Array.apply(null, {length: 212}).map((element, index) => {
        return String(index + 32);
      });
    }

    let timeSymbol, timePickerValue;
    timeSymbol = SYMBOL_SECOND;
    timePickerValue = Array.apply(null, {length: 240}).map((element, index) => {
      return String(index + 1);
    });


    let footer;
    if (this.state.showTemperaturePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.temperature}
                  onValueChangeEvent={this._updateTemperature}
                  values={temperaturePickerValue}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    } else if (this.state.showTimePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.time}
                  onValueChangeEvent={this._updateTime}
                  values={timePickerValue}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    } else if (this.state.showTeaTypePicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.teaType}
                  onValueChangeEvent={this._updateTeaType}
                  values={this.teaType}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    } else if (this.state.showTeaFlavorPicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.teaFlavor}
                  onValueChangeEvent={this._updateTeaFlavor}
                  values={this.teaFlavor}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    } else if (this.state.showTeaCaffeineLevelPicker) {
      footer = <View style={styles.picker}>
                <ItemPicker
                  selectedValue={this.state.tea.teaCaffeineLevel}
                  onValueChangeEvent={this._updateTeaCaffeineLevel}
                  values={this.teaCaffeineLevel}
                  dismissPicker={this._dismissPicker}
                  textStyle={text.p} />
              </View>;
    }

    let saveBtnOnPressEvent;
    let navbarTitle;
    if (this.props.isEditing) {
      saveBtnOnPressEvent = this._updateTea;
      navbarTitle = 'Edit tea note';
    } else {
      saveBtnOnPressEvent = this._saveTea;
      navbarTitle = 'Create tea note';
    }


    // update rating stars
    let ratingStars = [];
    let rating = this.state.tea.rating;
    for (let i = 1; i <= 5; i++) {
      if (i > rating) {
        ratingStars.push('star-o');
      } else {
        ratingStars.push('star');
      }
    }

    // load placeholder image / user selected note image
    let teaCoverPhoto;
    if ((this.state.isCoverImageSelected) || (this.props.isEditing)) {
      teaCoverPhoto = <Image source={this.state.tea.coverImageUrl} style={styles.coverImage}/>;
    } else {
      teaCoverPhoto = <Image source={require('../../public/image/photo_placeholder.png')} style={styles.coverImage} />;
    }

    return(
      <View style={containers.container}>

        <NotificationModal
          modalVisible={this.state.notificationModalVisible}
          modalMessage={'Note saved'}
        />

        <NotificationModal
          modalVisible={this.state.inputValidationNotificationModalVisible}
          modalMessage={'Please select a photo & enter the name of tea'}
        />

        <View style={{height: STATUS_BAR_HEIGHT_IOS, backgroundColor: colorScheme.color1}}></View>

        <View style={{height: 44, backgroundColor: colorScheme.color1}}>
          <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
            <View style={[containers.row, {justifyContent: 'flex-start'}]}>
              <IconButton
                iconName="times"
                size={25}
                color={color.white}
                onForward={() => {
                  this.props.navigator.pop();
                  this._clearCache();
                }} />
            </View>
            <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[text.title, {color: color.white}]}>{navbarTitle}</Text>
            </View>
            <View style={[containers.row, {justifyContent: 'flex-end'}]}>
              <Button
                enableButtonStyle={false}
                btnText="Save"
                textStyle={{fontWeight: 'normal'}}
                onForward={saveBtnOnPressEvent} />
            </View>
          </View>
        </View>

        <ScrollView>
          <View style={[containers.container, {backgroundColor: color.lightGray, paddingBottom: 60}]}>
            <View>
              <TouchableWithoutFeedback onPress={this._coverPhotoOnClick}>
                {teaCoverPhoto}
              </TouchableWithoutFeedback>

              <KeyboardAvoidingView>
                <View style={[styles.teaCardContainer, {justifyContent: 'center', paddingTop: 15}]}>
                  <View style={[containers.container, {alignItems: 'center'}]}>
                    <TextInput
                      value={this.state.tea.name}
                      placeholder={this.placeholders.name}
                      autoFocus={true}
                      style={[text.title, styles.teaCard_title, styles.inputBox]}
                      onChangeText={(name) => {
                        const tea = Object.assign({}, this.state.tea);
                        tea.name = name;
                        this.setState({ tea });
                      }}
                    />
                  </View>

                  <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                    <TouchableOpacity onPress={this._showTeaTypePicker}>
                      <Text style={[text.p, {color: color.gray}]}>{this.state.tea.teaType}</Text>
                    </TouchableOpacity>
                    <View>
                      <Text style={[text.p, {color: color.gray, marginLeft: 5, marginRight: 5}]}>-</Text>
                    </View>
                    <TouchableOpacity onPress={this._showTeaFlavorPicker}>
                      <Text style={[text.p, {color: color.gray}]}>{this.state.tea.teaFlavor}</Text>
                    </TouchableOpacity>
                    <View>
                      <Text style={[text.p, {color: color.gray, marginLeft: 5, marginRight: 5}]}>-</Text>
                    </View>
                    <TouchableOpacity onPress={this._showTeaCaffeineLevelPicker}>
                      <Text style={[text.p, {color: color.gray}]}>{this.state.tea.teaCaffeineLevel}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={[containers.row, {alignItems: 'flex-start', justifyContent: 'center'}]}>
                    {ratingStars.map((starIconName, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            const tea = Object.assign({}, this.state.tea);
                            tea.rating = index + 1;
                            this.setState({ tea });
                          }}>
                          <FontAwesomeIcon name={starIconName} size={20} color={color.yellow} />
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                </View>
              </KeyboardAvoidingView>
            </View>

            <View>
              <View style={[containers.row, {marginTop: CARD_BETWEEN_DISTANCE, padding: 15, backgroundColor: color.white}]}>
                <View>
                  <WithLabel iconName="ios-thermometer" textStyle={text.p} showPicker={this._showTemperaturePicker}>
                    <Text style={[text.number, styles.teaCard_data]}>
                      {`${this.state.tea.temperature} ${temperatureSymbol}`}
                    </Text>
                  </WithLabel>
                </View>
                <View>
                  <WithLabel iconName="ios-time" textStyle={text.p} showPicker={this._showTimePicker}>
                    <Text style={[text.number, styles.teaCard_data]}>
                      {`${this.state.tea.time} ${timeSymbol}`}
                    </Text>
                  </WithLabel>
                </View>
              </View>
            </View>

            <View>
              <View style={[containers.container, {justifyContent: 'flex-start', marginTop: CARD_BETWEEN_DISTANCE, backgroundColor: color.white}]}>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
                  <Text style={text.sectionTitle}>How to prepare</Text>
                </View>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
                  <View>
                    <Text style={[text.p, {color: color.gray, paddingBottom: 5}]}>{this.state.tea.brewSteps}</Text>
                  </View>
                  <TouchableOpacity onPress={() => {
                      if (this.state.tea.brewSteps !== '') {
                        this._openBrewStepsEditingView();
                      } else {
                        this._openBrewStepsCreatingView();
                      }
                    }}>
                    <Text style={[text.p, {color: color.aqua, fontSize: 12}]}>🖋 edit brew instructions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <View style={[containers.container, {justifyContent: 'flex-start', marginTop: CARD_BETWEEN_DISTANCE, backgroundColor: color.white}]}>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
                  <Text style={text.sectionTitle}>My Notes</Text>
                </View>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
                  <Text style={[text.p, {color: color.gray, paddingBottom: 5}]}>{this.state.tea.userNotes}</Text>
                  <TouchableOpacity onPress={() => {
                      if (this.state.tea.userNotes !== '') {
                        this._openUserNotesEditingView();
                      } else {
                        this._openUserNotesCreatingView();
                      }
                    }}>
                    <Text style={[text.p, {color: color.aqua, fontSize: 12}]}>🖋 edit your note</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {footer}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  coverImage: {
    height: COVERIMAGE_HEIGHT,
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
  },
  teaCardContainer: {
    width: SCREEN_WIDTH,
    height: COVERIMAGE_HEIGHT * 0.5,
    backgroundColor: color.white,
    borderRadius: 2,
  },
  teaCard_title: {
    width: SCREEN_WIDTH,
    textAlign: 'center',
    height: 24,
    fontWeight: '700',
  },
  teaCard_data: {
    textAlign: 'left',
    width: 90,
    textAlignVertical: 'center',
  },
  inputBox: {
    borderWidth: 0,
    textAlignVertical: 'bottom',
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
