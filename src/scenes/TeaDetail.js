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
        <View style={styles.backBtnContainer}>
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={this.props.onBack}>
              <Text style={styles.text}>Tap me to go back</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <View>
            <Image source={require('../../public/image/matcha-green-tea.png')} style={styles.coverImage} />
            <View style={styles.imageInnerContainer}>
              <View style={styles.teaCard}>
                <View>
                  <Text style={styles.teaCard_title}>Matcha Green Tea</Text>
                </View>
                <View>
                  <Text style={styles.teaCard_tags}>green tea - mild - low caffeine</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'center', paddingTop: 10 + CARD_OFFSET}}>
            <Text style={[styles.text, {fontSize: 14}]}>tap to see in different units of measurements</Text>
          </View>
          <View>
            <View style={[styles.row, {paddingTop: 10, paddingBottom: 10}]}>
              <Text style={[styles.text, {fontSize: 25, color: 'black'}]}>🎚215 °</Text>
              <Text style={[styles.text, {fontSize: 25, color: 'black'}]}>⏳3 min</Text>
            </View>
          </View>

          <View style={[styles.container, {borderWidth: 2}]}>
            <Text>How to brew</Text>
          </View>
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
  backBtnContainer: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 20,
  },
  backBtn: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  coverImage: {
    height: COVERIMAGE_HEIGHT,
    resizeMode: 'cover',
    width: SCREEN_WIDTH,
  },
  imageInnerContainer: {
    position: 'absolute',
    bottom: -CARD_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  teaCard: {
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
});
