import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActionSheetIOS,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View
} from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

import BackBtn from '../components/BackBtn';
import IconButton from '../components/IconButton';
import IconButtonWithLabel from '../components/IconButtonWithLabel';

import NotificationModal from '../modals/NotificationModal.js';

import text from '../style/text';
import color from '../style/color';
import colorScheme from '../style/colorScheme';
import containers from '../style/containers';
import position from '../style/position';

import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import secondToMinute from '../utils/secondToMinute';
import findSelectedSettingOption from '../utils/findSelectedSettingOption';
import convertSecondToMinuteString from '../utils/convertSecondToMinuteString';

import {
  CARD_BETWEEN_DISTANCE,
  COVERIMAGE_HEIGHT,
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  DEFAULT_SETTINGS,
  SCREEN_WIDTH,
  SYMBOL_CELSIUS,
  SYMBOL_FAHRENHEIT,
  SYMBOL_MINUTE,
  SYMBOL_SECOND,
} from '../constants';



export default class TeaDetail extends Component {
  state = {
    displayTimeInSecond: true,
    displayTimeInMinute: false,
    notificationModalVisible: false,
  }

  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this._showShareActionSheet = this._showShareActionSheet.bind(this);
    this._toggleLike = this._toggleLike.bind(this);
    this._displayTimeInDifferentUnit = this._displayTimeInDifferentUnit.bind(this);

    this.settings = DEFAULT_SETTINGS;
    if (this.props.storage) {
      if (this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content) {
        this.settings = this.props.storage[CUSTOMIZED_SETTINGS_STORAGE_KEY].content;
      }
    }

  }

  _onForward() {
    this.props.navigator.push({
      name: 'TeaTimer'
    });
  }

  _showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'http://react-review.leanapp.cn/app/tea-notes',
      message: 'Tea Notes - tea brewing tips & notes assistant',
      subject: 'Tea Notes - tea brewing tips & notes assistant',
    },
    (error) => {
      console.log(error);
    } ,
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
    });
  }

  _toggleLike() {
    let tea = Object.assign({}, this.props.currentSelectedTea);
    tea.isLiked = !tea.isLiked;
    this.props.storageUnit.updateItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY, tea);
    this.props.updateCurrentSelectedTea(tea);
  }

  _displayTimeInDifferentUnit() {
    if (!this.state.displayTimeInSecond && this.state.displayTimeInMinute) {
      this.refs.displayTime.fadeOut();
      this.setState({
        displayTimeInSecond: true,
        displayTimeInMinute: false,
      });
       this.refs.displayTime.fadeIn();
    } else if (this.state.displayTimeInSecond && !this.state.displayTimeInMinute) {
      this.refs.displayTime.fadeOut();
      this.setState({
        displayTimeInSecond: false,
        displayTimeInMinute: true,
      });
      this.refs.displayTime.fadeIn();
    }
  }

  render() {
    const temperatureOption = findSelectedSettingOption(this.settings.temperatureOptions);
    const timeOption = findSelectedSettingOption(this.settings.timeOptions);

    // display temperature
    let temperature;
    if (temperatureOption === "celsius") {
      temperature = `${this.props.currentSelectedTea.temperature} ${SYMBOL_CELSIUS}`;
    } else {
      temperature = `${celsiusToFahrenheit(this.props.currentSelectedTea.temperature)} ${SYMBOL_FAHRENHEIT}`;
    }

    // display time
    let time;
    if (!this.state.displayTimeInMinute && this.state.displayTimeInSecond) {
      time = `${this.props.currentSelectedTea.time} ${SYMBOL_SECOND}`;
    } else {
      time = convertSecondToMinuteString(secondToMinute(this.props.currentSelectedTea.time), SYMBOL_MINUTE, SYMBOL_SECOND);
    }

    //like icons
    let likeIconName = 'heart-o';
    let likeIconColor = color.white;
    if (this.props.currentSelectedTea.isLiked) {
      likeIconName = 'heart';
      likeIconColor = colorScheme.color5;
    }

    // rating stars
    let ratingStars = [];
    let rating = this.props.currentSelectedTea.rating;
    for (let i = 1; i <= 5; i++) {
      if (i > rating) {
        ratingStars.push('star-o');
      } else {
        ratingStars.push('star');
      }
    }

    // user notes
    let userNotes = this.props.currentSelectedTea.userNotes;
    let userNotesTextStyle = {};
    if ((userNotes === '') && (this.props.currentSelectedTea.addedByMe)) {
      userNotes = 'You don\'t have any notes now.\nEdit to add your notes!';
      userNotesTextStyle = { color: color.midGray, fontSize: 12, fontStyle: 'italic' };
    }

    // brew steps
    let brewSteps = this.props.currentSelectedTea.brewSteps;
    let brewStepsTextStyle = {};
    if ((brewSteps === '') && (this.props.currentSelectedTea.addedByMe)) {
      brewSteps = 'You don\'t have any instructions of brewing this tea.\nEdit to add tea brew steps!';
      brewStepsTextStyle = { color: color.midGray, fontSize: 12, fontStyle: 'italic' };
    }

    // notes section
    let notesSections;
    if (this.props.currentSelectedTea.addedByMe) {
      notesSections = <View>
      <View>
        <View style={[containers.container, {justifyContent: 'flex-start', marginTop: CARD_BETWEEN_DISTANCE, backgroundColor: color.white}]}>
          <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
            <Text style={text.sectionTitle}>How to prepare</Text>
          </View>
          <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
            <Text style={[text.p, {color: color.gray, paddingBottom: 5}, brewStepsTextStyle]}>
              {brewSteps}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View style={[containers.container, {justifyContent: 'flex-start', marginTop: CARD_BETWEEN_DISTANCE, backgroundColor: color.white}]}>
          <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
            <Text style={text.sectionTitle}>Notes</Text>
          </View>
          <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
            <Text style={[text.p, {color: color.gray, paddingBottom: 5}, userNotesTextStyle]}>
              {userNotes}
            </Text>
          </View>
        </View>
      </View>
    </View>;
  } else {
    notesSections =
    <View>
      <View style={[containers.container, {justifyContent: 'flex-start', marginTop: CARD_BETWEEN_DISTANCE, backgroundColor: color.white}]}>
        <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
          <Text style={text.sectionTitle}>How to prepare</Text>
        </View>
        <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
          <Text style={[text.p, {color: color.gray, paddingBottom: 5}, brewStepsTextStyle]}>
            {brewSteps}
          </Text>
        </View>
      </View>
    </View>

  }

    // tab bar -
    // 1. built-in tea note: no like & edit & delete, 2 buttons
    // 2. user-created tea note: can edit & delete, 5 buttons
    let tabbar;
    if (this.props.currentSelectedTea.addedByMe) {
      tabbar =
      <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}
          onPress={this._toggleLike}>
          <IconButtonWithLabel
            labelText="favorite"
            iconName={likeIconName}
            size={20}
            color={likeIconColor}
            onForward={this._toggleLike} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}
          onPress={() => {
            this.props.updateEditingStatus(true);
            this.props.navigator.push({
              name: 'CreateTea'
            });
          }}>
          <IconButtonWithLabel
            labelText="edit"
            iconName="pencil-square-o"
            size={20}
            color={color.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme.color5}]}
          onPress={this._onForward}>
          <IconButtonWithLabel
            labelText="timer"
            iconName="coffee"
            size={20}
            color={color.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}
          onPress={this._showShareActionSheet}>
          <IconButtonWithLabel
            labelText="share"
            iconName="share-square-o"
            size={20}
            color={color.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions({
              options: ['delete this tea note', 'cancel'],
              destructiveButtonIndex: 0,
              cancelButtonIndex: 1,
            }, (buttonIndex) => {
              if (buttonIndex === 0) {
                this.props.storageUnit.deleteItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY, this.props.currentSelectedTea);
                this.setState({ notificationModalVisible: true });
                this.props.navigator.pop();
              }
            });
          }}>
          <IconButtonWithLabel
            labelText="delete"
            iconName="trash-o"
            size={20}
            color={color.white} />
        </TouchableOpacity>
      </View>
    } else {
      tabbar =
      <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}
          onPress={this._onForward}>
          <IconButtonWithLabel
            labelText="timer"
            iconName="coffee"
            size={20}
            color={color.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}
          onPress={this._showShareActionSheet}>
          <IconButtonWithLabel
            labelText="share"
            iconName="share-square-o"
            size={20}
            color={color.white} />
        </TouchableOpacity>
      </View>
    }


    return(
      <View style={[containers.container, {backgroundColor: color.lightGray}]}>
        <NotificationModal
          modalVisible={this.state.notificationModalVisible}
          modalMessage={'Note deleted'}
        />

        <ScrollView>
          <View style={[containers.container, {paddingBottom: 80, justifyContent: 'flex-start'}]}>
            <BackBtn
              navigator={this.props.navigator}
              onPressEvent={() => {
                this.props.updateEditingStatus(false);
              }} />
            <View>
              <Image source={{uri: this.props.currentSelectedTea.coverImageUrl.uri}} style={styles.coverImage} />
              <View>
                <View style={[styles.teaCardContainer, {justifyContent: 'center', paddingTop: 15}]}>
                  <View style={[containers.row, {alignItems: 'flex-end'}]}>
                    <Text style={[text.title, {fontWeight: '700'}]}>{this.props.currentSelectedTea.name}</Text>
                  </View>

                  <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                    <Text style={[text.p, {color: color.gray}]}>{this.props.currentSelectedTea.teaType}</Text>
                    <Text style={[text.p, {color: color.gray, marginLeft: 5, marginRight: 5}]}>-</Text>
                    <Text style={[text.p, {color: color.gray}]}>{this.props.currentSelectedTea.teaFlavor}</Text>
                    <Text style={[text.p, {color: color.gray, marginLeft: 5, marginRight: 5}]}>-</Text>
                    <Text style={[text.p, {color: color.gray}]}>{this.props.currentSelectedTea.teaCaffeineLevel}</Text>
                  </View>

                  <View style={[containers.row, {alignItems: 'flex-start', justifyContent: 'center'}]}>
                    {ratingStars.map((starIconName, index) => {
                      return (<FontAwesomeIcon name={starIconName} key={index} size={20} color={color.yellow} />);
                    })}
                  </View>
                </View>
              </View>
            </View>

            <View>
              <View style={[containers.row, {marginTop: CARD_BETWEEN_DISTANCE, padding: 15, backgroundColor: color.white}]}>
                <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                  <IoniconsIcon name="ios-thermometer" size={20} color={color.pink} />
                  <Text style={[text.number, {marginLeft: 10}]}>{temperature}</Text>
                </View>
                <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                  <IoniconsIcon name="ios-time" size={20} color={color.pink} />
                  <TouchableWithoutFeedback onPress={this._displayTimeInDifferentUnit}>
                    <View>
                      <Animatable.Text ref="displayTime" style={[text.number, {marginLeft: 10}]}>
                        {time}
                      </Animatable.Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
            {notesSections}
          </View>
        </ScrollView>

        <View style={[containers.stickyFooter, {left: 0, right: 0}]}>
          <View style={{height: 49, backgroundColor: colorScheme.color1}}>
            {tabbar}
          </View>
        </View>
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
  }
});
