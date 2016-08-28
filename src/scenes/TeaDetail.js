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
        <View style={styles.container}>
          <View>
            <Image source={require('../../public/image/matcha-green-tea.png')} style={styles.coverImage} />
            <View style={styles.backBtn}>
              <TouchableOpacity onPress={this.props.onBack}>
                <Text style={[styles.text, {color: 'white', fontSize: 14}]}>close</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.teaCardWrapper}>
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
          <View style={{alignItems: 'center', paddingTop: 10 + CARD_OFFSET, backgroundColor: 'white'}}>
            <Text style={[styles.text, {fontSize: 14}]}>tap to see in different units of measurements</Text>
          </View>
          <View>
            <View style={[styles.row, {paddingTop: 10, paddingBottom: 10, backgroundColor: 'white'}]}>
              <Text style={[styles.text, {fontSize: 25, color: 'black'}]}>🎚215 °</Text>
              <Text style={[styles.text, {fontSize: 25, color: 'black'}]}>⏳3 min</Text>
            </View>
          </View>

          <View style={[styles.container, {borderWidth: 2, backgroundColor: 'white'}]}>
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
  teaCardWrapper: {
    alignItems: 'center',
    bottom: -CARD_OFFSET,
    left: 0,
    position: 'absolute',
    right: 0,
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
    shadowColor: 'rgb(0, 0, 0)',
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
