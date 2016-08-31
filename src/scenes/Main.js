/**
 * Main.js
 *
 * The main (and first) scene when opening the page.
 * It defines navigator globally, configures navigation transition animation.
 * Meanwhile, it stores all state, state related function in this class.
 *
 * @zchen
 */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import ImageRow from '../components/ImageRow.js';
import Button from '../components/Button.js';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Tea {
  constructor(name, temperature, time) {
    this.name = name;
    this.temperature = temperature;
    this.time = time;
  }
}

export default class Main extends Component {
  constructor() {
    super();
    this._iconOnPress = this._iconOnPress.bind(this);
    this._onForward = this._onForward.bind(this);
    this._onShowSetting = this._onShowSetting.bind(this);
    this._onShowCreateTea = this._onShowCreateTea.bind(this);

    this.teas = ['Pu-erh', 'Matcha green tea', 'Black tea', 'Oolong tea'];
    this.state = {
      index: 1,
    };
  }
  _iconOnPress() {
    if (this.state.index === this.teas.length - 1) {
      this.setState({
        index: 0
      });
    } else {
      const index = this.state.index + 1;
      this.setState({
        index: index
      });
    }
  }
  _onForward() {
    this.props.navigator.push({
      name: 'TeaSelection',
    });
  }
  _onShowSetting() {
    this.props.navigator.push({
      name: 'Setting',
    });
  }
  _onShowCreateTea() {
    this.props.navigator.push({
      name: 'CreateTea',
    });
  }
  render() {
    const teaName = this.teas[this.state.index];

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.backBtn}>
          <TouchableOpacity onPress={this._onShowSetting}>
            <Text style={[styles.text, {color: 'black', fontSize: 14}]}>settings</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[styles.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 200}]}>
            <TouchableWithoutFeedback onPress={this._iconOnPress}>
              <View>
                <Image style={{width: 192, height: 150}} source={require('../../public/image/tea-leaf.png')} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>Good mood for some</Text>
            <Text style={styles.text}>{`${teaName}?`}</Text>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Button
              onForward={this._onShowCreateTea}
              btnText="Add New Tea"
              style={{backgroundColor: 'rgb(255,127,124)', borderWidth: 0, width: 150}}
            />
            <Button
              onForward={this._onForward}
              btnText="Browse Tea List"
              style={{backgroundColor: 'rgb(148,235,95)', borderWidth: 0, width: 150}}
            />
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
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
});
