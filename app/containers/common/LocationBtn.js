// 定位按钮 (去定位页面)
import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux';


class LocationBtn extends Component {

  render(){
    return (<TouchableWithoutFeedback onPress={() => this.goToLocationPage()}>
      <Icon name='location-on' size={50} color='#ffd100' />
    </TouchableWithoutFeedback>)
  }

  goToLocationPage(){
    Actions.locationPage();
  }
}

export default LocationBtn;