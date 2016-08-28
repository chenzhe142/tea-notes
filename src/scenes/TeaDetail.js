import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
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

import Button from '../components/Button.js'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const COVERIMAGE_HEIGHT = SCREEN_WIDTH / 3 * 2;
const CARD_OFFSET = 20;

export default class TeaDetail extends Component {
  static PropTypes = {
    onBack: PropTypes.func,
  }
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.container, {backgroundColor: 'white', height: SCREEN_HEIGHT}]}>
            <View>
              <Image source={require('../../public/image/matcha-green-tea.png')} style={styles.coverImage} />
              <View style={[styles.backBtn, {backgroundColor: 'rgba(0,0,0,0)'}]}>
                <TouchableOpacity onPress={this.props.onBack}>
                  <Text style={[styles.text, {color: 'white', fontSize: 14}]}>close</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.teaCard}>
                <View style={styles.teaCardContainer}>
                  <View>
                    <Text style={styles.teaCard_title}>Matcha Green Tea</Text>
                  </View>
                  <View>
                    <Text style={styles.teaCard_tags}>green tea - mild - low caffeine</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 10 + CARD_OFFSET}}>
              <Text style={[styles.text, {fontSize: 14}]}>tap to see in different units of measurements</Text>
            </View>
            <View>
              <View style={[styles.row, {marginTop: 10, marginBottom: 10, backgroundColor: 'white'}]}>
                <Text style={[styles.text, {fontSize: 25, color: 'black'}]}>🎚215 °</Text>
                <Text style={[styles.text, {fontSize: 25, color: 'black'}]}>⏳3 min</Text>
              </View>
            </View>
            <View style={[styles.container, {borderWidth: 2}]}>
              <Text>How to brew</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.stickyFooter}>
          <Button btnText="lalala" style={{backgroundColor: 'rgb(148,235,95)'}} />
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
  text: {
    color: 'rgb(102,102,102)',
    fontFamily: 'Open Sans',
    fontSize: 20,
  },
  backBtn: {
    left: 0,
    position: 'absolute',
    top: 0,
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
    height: COVERIMAGE_HEIGHT * 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.5,
    borderRadius: 2,
  },
  teaCard_title: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    fontWeight: 'bold',
  },
  teaCard_tags: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: 'rgb(102,102,102)',
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
  }
});
