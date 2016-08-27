/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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
      <ScrollView>
        <View style={styles.backBtnContainer}>
          <View style={styles.backBtn}>
            <TouchableOpacity onPress={this.props.onBack}>
              <Text style={styles.text}>Tap me to go back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Image source={require('../../public/image/brewingtea-animated.gif')}>
            <View style={styles.nameList}>
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
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <Text style={styles.instructions}>{rowData}</Text>}
              />
            </View>
          </Image>
        </View>
      </ScrollView>
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
