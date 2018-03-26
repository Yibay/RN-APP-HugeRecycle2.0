import React, { Component } from 'react';

import Orientation from 'react-native-orientation';


export const lockOrientation = (WrappedComponent, lockOrientation='lockToPortrait') => class extends Component {

  componentWillMount(){
    switch(lockOrientation){
      // 将视图锁定为 纵向模式
      case 'lockToPortrait':
        Orientation.lockToPortrait();
        break;
      // 将视图锁定为 横向模式
      case 'lockToLandscape':
        Orientation.lockToLandscape();
        break;
      // 将视图锁定为 纵向模式
      default:
        Orientation.lockToPortrait();
    }
  }

  render(){
    return <WrappedComponent {...this.props}/>
  }

};