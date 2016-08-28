/**
 * TeaSelection.js
 *
 * @zchen
 */

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

import ImageRow from '../components/ImageRow.js'
import Button from '../components/Button.js'

export default class TeaSelection extends Component {
  static PropTypes = {
    onForward: PropTypes.func,
  }
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ])
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <ScrollView>
          <View style={styles.nameList}>
            <View style={styles.backBtn}>
              <TouchableOpacity onPress={this.props.onBack}>
                <Text style={[styles.text, {color: 'white', fontSize: 14}]}>back</Text>
              </TouchableOpacity>
            </View>
            <ImageRow
              imageSource={require('../../public/image/matcha-green-tea.png')}
              tea={{name:"matcha green tea"}}
              onPressEvent={this.props.onForward}
            />
            <ImageRow
              imageSource={require('../../public/image/puer-tea.png')}
              tea={{name:"pu-er tea"}}
            />
            <ImageRow
              imageSource={require('../../public/image/tieguanyin.jpg')}
              tea={{name:"tie guan yin"}}
            />
            <ImageRow
              imageSource={require('../../public/image/jinjunmei.jpg')}
              tea={{name:"jin jun mei black tea"}}
            />
            <ImageRow
              imageSource={require('../../public/image/matcha-green-tea.png')}
              tea={{name:"matcha green tea"}}
            />
            <ImageRow
              imageSource={require('../../public/image/puer-tea.png')}
              tea={{name:"pu-er tea"}}
            />
            <ImageRow
              imageSource={require('../../public/image/tieguanyin.jpg')}
              tea={{name:"tie guan yin"}}
            />
            <ImageRow
              imageSource={require('../../public/image/jinjunmei.jpg')}
              tea={{name:"jin jun mei black tea"}}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    color: '#333333',
  },
  nameList: {
    backgroundColor: 'transparent',
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
});
