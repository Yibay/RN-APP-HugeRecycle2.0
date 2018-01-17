/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';


import store from './redux/store';
import AppRouter from './router/index';
import './util/globalStorage'; // 将 储存 抽象至全局

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    );
  }
}