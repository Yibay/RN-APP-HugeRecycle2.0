import React, { Component } from 'react';
import {Provider} from 'react-redux';


import AppRouter from './router';
import store from "./redux/store";


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