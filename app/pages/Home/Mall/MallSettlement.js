import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


import {connect} from "react-redux";


import {verifyStoreInfo} from "../../../HOC/verifyStoreInfo";
import {verifyLogin} from "../../../HOC/verifyLogin";
import Header from "../../../components/Header/Header";


class MallSettlement extends Component {
  render(){
    return <View style={styles.container}>
      <Header title='订单结算'/>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.store.storeInfo[state.mall.store.storeIndex].storeId,
    storeName: state.mall.store.storeInfo[state.mall.store.storeIndex].storeName
  }
}

// 需验证登录
// 需验证绑定便利店
export default verifyLogin(verifyStoreInfo(connect(mapStateToProps)(MallSettlement)));