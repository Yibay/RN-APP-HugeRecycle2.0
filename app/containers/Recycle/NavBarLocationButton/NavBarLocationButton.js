import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';

import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import _ from 'lodash';


import { setAutoLocationFlag } from '../../../redux/actions/Location';


/* 回收页 nav 右侧按钮组件 */
class NavBarLocationButton extends Component{

  static propTypes = {
    showStationName: PropTypes.bool.isRequired
  };

  static defaultProps = {
    showStationName: false
  };

  render(){
    return(<TouchableOpacity style={styles.container} onPress={() => this.chooseCommunity()}>
      <Image style={styles.icon} resizeMode='contain' source={require('./img/location-black2x.png')} />
      {
        this.props.showStationName ?
          <View style={styles.text2lineBox}>
            <Text style={styles.text2line}>{this.props.currentCommunityName}</Text>
            <Text style={styles.text2line}>{`(${this.props.stationName ? this.props.stationName : '暂无服务站'})`}</Text>
          </View>
          :
          <Text style={styles.text}>{this.props.currentCommunityName}</Text>
      }
    </TouchableOpacity>);
  }

  // 选择小区
  chooseCommunity(){
    Actions.locationPage();
    this.props.setAutoLocationFlag(true);
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 10
  },
  text: {
    fontSize: 28
  },
  text2lineBox: {
    marginBottom: -3
  },
  text2line: {
    fontSize: 20,
    lineHeight: 20
  }
});


// 过滤出有用state映射给props
function mapStateToProps(state){
  return _.merge(
    {
      currentCommunityName: state.location.currentLocation.communityName,
    },
    // 若 便利店 数组不为空
    state.mall.store.data.storeInfo.length ? { stationName: state.mall.store.data.storeInfo[state.mall.store.data.storeIndex].storeName } : {}
  )
}

const actionsCreator = {
  setAutoLocationFlag
};

export default connect(mapStateToProps, actionsCreator)(NavBarLocationButton);