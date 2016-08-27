import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ListView,
  Text,
  Image,
  StatusBar,
  View
} from 'react-native';

import ImageRow from '../components/ImageRow.js';
import Button from '../components/Button.js';

export default class Main extends Component {
  constructor() {
    super();
    this.teas = ['Pu-erh', 'Matcha green tea', 'Black tea', 'Oolong tea'];
    this.state = {
      index: 1
    };
    this._iconOnPress = this._iconOnPress.bind(this);
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
  render() {
    const teaName = this.teas[this.state.index];

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
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
