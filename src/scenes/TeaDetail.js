import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

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
        <View style={styles.row}>
          <Image source={require('../../public/image/matcha-green-tea@1.png')} style={{height: 235, resizeMode: 'cover'}} />
        </View>
        <View style={styles.row}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontFamily: 'Open Sans',
    fontSize: 20,
    color: 'rgb(102,102,102)'
  },
  backBtnContainer: {
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  }
});
