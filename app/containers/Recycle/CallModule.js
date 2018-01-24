import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import { defaultCurrentLocation, setAutoLocationFlag } from '../../redux/actions/Location';


class CallModule extends Component{
  render(){
    return (<View style={styles.container}>
      <View style={styles.callMsg}>
        <Text style={styles.callMsgText}>当前共有</Text>
        <Text style={styles.recyclablesNum}>{this.props.recycledItemsNumber}</Text>
        <Text style={styles.callMsgText}>项回收物</Text>
      </View>
      <TouchableOpacity onPress={() => this.callOut()}>
        <View style={styles.callBtn}>
          <Text style={styles.callBtnText}>一键呼叫</Text>
        </View>
      </TouchableOpacity>
    </View>)
  }

  callOut(){
    // 未选小区，去定位页选地址
    if(this.props.currentLocation.communityName === defaultCurrentLocation.communityName){
      Actions.locationPage();
      this.props.setAutoLocationFlag(true);
      return;
    }
    // 未选物品(弹窗) || 未登录（弹窗, 填地址）
    if(!this.props.recycledItemsNumber || !this.props.authToken){
      this.props.showCallModal();
      return;
    }

    // 已选小区、已选物品、已登录 去待回收订单页
    Actions.recycleOrderPage();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  callMsg: {
    height: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  callMsgText: {
    fontSize: 24,
    color: '#828282'
  },
  recyclablesNum: {
    paddingHorizontal: 15,
    fontSize: 30,
    color: 'red'
  },
  callBtn: {
    width: 243,
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffd101'
  },
  callBtnText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff'
  }
});

function mapStateToProps(state){
  return {
    recycledItemsNumber: state.recycle.recycledItemsList.num,
    currentLocation: state.location.currentLocation,
    authToken: state.identityToken.authToken
  }
}

const actionsCreator = {
  setAutoLocationFlag
};

export default connect(mapStateToProps, actionsCreator)(CallModule);