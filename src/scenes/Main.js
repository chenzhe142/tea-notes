import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

import ImageRow from '../components/ImageRow.js';
import Button from '../components/Button.js';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View>
          <View style={[styles.row, {flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 200}]}>
            <Image style={{width: 192, height: 150}} source={require('../../public/image/tea-leaf.png')} />
            <Text style={styles.text}>Good mood for some</Text>
            <Text style={styles.text}>Pu-erh tea?</Text>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Button
              onForward={this.props.onForward}
              btnText="Create your own"
              style={{backgroundColor: 'rgb(255,127,124)', borderWidth: 0, width: 150}}
            />
            <Button
              onForward={this.props.onForward}
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
  }
});
