import React, { Component, PropTypes } from 'react';
import {
  ActionSheetIOS,
  Image,
  ListView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Button from '../components/Button';
import BackBtn from '../components/BackBtn';
import TopBtn from '../components/TopBtn';
import IconButton from '../components/IconButton';

import text from '../style/text';
import color from '../style/color';
import containers from '../style/containers';
import position from '../style/position';

import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import secondToMinute from '../utils/secondToMinute';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  COVERIMAGE_HEIGHT,
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
  CUSTOMIZED_TEA_LIST_STORAGE_KEY,
  DEFAULT_SETTINGS,
  SYMBOL_CELSIUS,
  SYMBOL_FAHRENHEIT,
  SYMBOL_SECOND,
  SYMBOL_MINUTE
} from '../constants';

export default class TeaDetail extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
    this._showShareActionSheet = this._showShareActionSheet.bind(this);
    this._toggleLike = this._toggleLike.bind(this);

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

  _findSelectedOption(options) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].isSelected === true) {
        return options[i].text;
      }
    }
  }

  _showShareActionSheet() {
    //url needs to be a real one, which can be opened in browser!
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: 'http://react-review.leanapp.cn',
      message: 'Share an awesome tea note to you!',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
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

  render() {
    const temperatureOption = this._findSelectedOption(this.settings.temperatureOptions);
    const timeOption = this._findSelectedOption(this.settings.timeOptions);

    let temperature;
    let time;

    if (temperatureOption === "celsius") {
      temperature = `${this.props.currentSelectedTea.temperature} ${SYMBOL_CELSIUS}`;
    } else {
      temperature = `${celsiusToFahrenheit(this.props.currentSelectedTea.temperature)} ${SYMBOL_FAHRENHEIT}`;
    }

    if (timeOption === 'second') {
      time = `${this.props.currentSelectedTea.time} ${SYMBOL_SECOND}`;
    } else {
      covertedTime = secondToMinute(this.props.currentSelectedTea.time);

      let minutePart = {
        text: '',
        isAvailable: false
      };
      if (covertedTime.minute > 0) {
        minutePart = {
          text: `${covertedTime.minute} ${SYMBOL_MINUTE}`,
          isAvailable: true
        };
      }

      let secondPart = {
        text: '',
        isAvailable: false
      };

      if (covertedTime.second > 0) {
        secondPart = {
          text: `${covertedTime.second} ${SYMBOL_SECOND}`,
          isAvailable: true
        };
      }

      let space = '';
      if (minutePart.isAvailable && secondPart.isAvailable) {
        space = ' ';
      }

      time = `${minutePart.text}${space}${secondPart.text}`;
    }

    //like icons
    let likeIconName = 'heart-o';
    if (this.props.currentSelectedTea.isLiked) {
      likeIconName = 'heart';
    }

    return(
      <View style={containers.container}>
        <ScrollView>
          <View style={[containers.container, {backgroundColor: color.lightGray, paddingBottom: 80, justifyContent: 'flex-start'}]}>
            <BackBtn
              navigator={this.props.navigator}
              onPressEvent={() => {
                this.props.updateEditingStatus(false);
              }} />
            <View>
              <Image source={{uri: this.props.currentSelectedTea.coverImageUrl.uri}} style={styles.coverImage} />
              <View style={styles.teaCard}>
                <View style={styles.teaCardContainer}>
                  <View>
                    <Text style={text.title}>{this.props.currentSelectedTea.name}</Text>
                  </View>
                  <View>
                    <Text style={[text.p, {color: color.gray}]}>green tea - mild - low caffeine</Text>
                  </View>
                  <View>
                    <Text style={[text.p, {color: color.yellow, fontSize: 18}]}>★★★★☆</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <View style={[containers.row, containers.card]}>
                <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                  <IoniconsIcon name="ios-thermometer" size={20} color={color.pink} />
                  <Text style={[text.number, {marginLeft: 10}]}>{temperature}</Text>
                </View>
                <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                  <IoniconsIcon name="ios-time" size={20} color={color.pink} />
                  <Text style={[text.number, {marginLeft: 10}]}>{time}</Text>
                </View>
              </View>
            </View>
            <View>
              <View style={[containers.container, {justifyContent: 'flex-start', marginTop: 15, backgroundColor: color.white, height: 100}]}>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
                  <Text style={text.sectionTitle}>How to brew</Text>
                </View>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
                  <Text style={text.p}>
                    {this.props.currentSelectedTea.brewSteps}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View style={[containers.container, {justifyContent: 'flex-start', marginTop: 15, backgroundColor: color.white, height: 100}]}>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15, borderBottomWidth: 1, borderBottomColor: color.lightGray}}>
                  <Text style={text.sectionTitle}>Notes</Text>
                </View>
                <View style={{paddingTop: 10, marginLeft: 15, paddingBottom: 10, marginRight: 15}}>
                  <Text style={text.p}>
                    {this.props.currentSelectedTea.userNotes}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[containers.stickyFooter, {left: 0, right: 0}]}>
          <View style={{height: 40, backgroundColor: color.pink}}>
            <View style={[containers.row, {justifyContent: 'space-between', alignItems: 'center', marginLeft: 10, marginRight: 10}]}>
              <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                <IconButton
                  iconName={likeIconName}
                  size={20}
                  color={color.white}
                  onForward={this._toggleLike} />
              </View>
              <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                <IconButton
                  iconName="share-square-o"
                  size={20}
                  color={color.white}
                  onForward={this._showShareActionSheet} />
              </View>
              <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                <IconButton
                  iconName="coffee"
                  size={20}
                  color={color.white}
                  onForward={this._onForward} />
              </View>
              <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                <IconButton
                  iconName="pencil-square-o"
                  size={20}
                  color={color.white}
                  onForward={() => {
                    this.props.updateEditingStatus(true);
                    this.props.navigator.push({
                      name: 'CreateTea'
                    });
                  }} />
              </View>
              <View style={[containers.row, {justifyContent: 'center', alignItems: 'center'}]}>
                <IconButton
                  iconName="trash-o"
                  size={20}
                  color={color.white}
                  onForward={() => {
                    this.props.storageUnit.deleteItem(CUSTOMIZED_TEA_LIST_STORAGE_KEY, this.props.currentSelectedTea);
                    this.props.navigator.pop();
                  }} />
              </View>
            </View>
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
  teaCard: {
    alignItems: 'center',
  },
  teaCardContainer: {
    width: SCREEN_WIDTH,
    height: COVERIMAGE_HEIGHT * 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  }
});
