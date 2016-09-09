import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

import Button from '../components/Button.js';
import BackBtn from '../components/BackBtn.js';

import text from '../style/text.js';
import color from '../style/color.js';

import { SCREEN_WIDTH, SCREEN_HEIGHT, COVERIMAGE_HEIGHT, CARD_OFFSET } from '../constants';

export default class TeaDetail extends Component {
  constructor(props) {
    super(props);
    this._onForward = this._onForward.bind(this);
  }
  _onForward() {
    this.props.navigator.push({
      name: 'TeaTimer'
    });
  }
  render() {
    return(
      <View style={styles.container}>

        <BackBtn navigator={this.props.navigator} textStyle={[text.p, {color: color.white}]} text="close" />

        <ScrollView>
          <View style={[styles.container, {backgroundColor: color.white, height: SCREEN_HEIGHT}]}>
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
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 10 + CARD_OFFSET}}>
              <Text style={[text.p, {color: color.gray}]}>tap to see in different units of measurements</Text>
            </View>
            <View>
              <View style={[styles.row, {marginTop: 10, marginBottom: 10, backgroundColor: color.white}]}>
                <Text style={text.number}>🎚{this.props.currentSelectedTea.temperature} °</Text>
                <Text style={text.number}>⏳{this.props.currentSelectedTea.time} min</Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text>How to brew</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.stickyFooter}>
          <Button btnText="Start Brewing!" style={{backgroundColor: color.green}} onForward={this._onForward} />
        </View>
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
    backgroundColor: 'white',
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
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  }
});
