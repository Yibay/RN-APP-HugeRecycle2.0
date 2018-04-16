import React, { Component } from 'react';
import {Provider} from 'react-redux';


import store from "./redux/store";
import './App.scss'; // 屏幕适配
import AppRouter from './router';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;