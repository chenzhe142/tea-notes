import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';

import text from '../style/text.js';
import color from '../style/color.js';
import containers from '../style/containers.js';

import celsiusToFahrenheit from '../utils/celsiusToFahrenheit';
import secondToMinute from '../utils/secondToMinute';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  COVERIMAGE_HEIGHT,
  CUSTOMIZED_SETTINGS_STORAGE_KEY,
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

    return(
      <View style={containers.container}>
        <BackBtn navigator={this.props.navigator} />
        <ScrollView>
          <View style={[containers.container, {backgroundColor: color.lightGray, height: SCREEN_HEIGHT}]}>
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
            <View style={[containers.container, {justifyContent: 'flex-start'}]}>
              <Text>How to brew</Text>
            </View>
          </View>
        </ScrollView>
        <View style={containers.stickyFooter}>
          <Button btnText="Start Brewing!" style={{backgroundColor: color.green}} onForward={this._onForward} />
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
