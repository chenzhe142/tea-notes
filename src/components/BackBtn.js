/**
 * BackBtn.js
 *
 * Inherited from TopBtn.js
 */

import React, { Component } from 'react';

import TopBtn from './TopBtn';

import position from '../style/position';

export default class BackBtn extends Component {
  constructor(props) {
    super(props);
    this._onBack = this._onBack.bind(this);
  }
  _onBack() {
    this.props.navigator.pop();
    if (this.props.onPressEvent) {
      this.props.onPressEvent();
    }
  }
  render() {
    return (
      <TopBtn iconName="times" onPressEvent={this._onBack} style={position.topLeft} />
    );
  }
}
