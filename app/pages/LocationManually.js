import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import PropTypes from 'prop-types';


import Header from '../components/Header/Header';
import CommunitySearchEngines from '../containers/LocationManually/CommunitySearchEngines/CommunitySearchEngines';
import NetworkVerify from "../components/NetworkVerify";


class LocationManually extends Component {

  static propTypes = {
    selectedLocationCallBack: PropTypes.func // 有此回调函数，则选中小区后，不更新给redux currentLocation
  };

  render(){
    return (<View style={styles.container}>
      <Header title='手动输入小区'/>
      <NetworkVerify>
        <CommunitySearchEngines selectedLocationCallBack={this.props.selectedLocationCallBack} />
      </NetworkVerify>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default LocationManually;