import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, FlatList } from 'react-native';

import { Actions } from 'react-native-router-flux';


import { verifyLogin } from '../HOC/verifyLogin';
import request from '../util/request/request';
import config from '../util/request/config';

import Header from '../components/Header/Header';
import RecycleRecordItem from '../containers/RecycleRecord/RecycleRecordItem';


class EnvironmentalRecord extends Component {

  constructor(props){
    super(props);

    this.state = {
      recordItems: [], // 回收记录列表
      isRefreshing: false // 下拉刷新loading图
    };
  }
  
  render(){
    let recordItems = this.state.recordItems.map((item, index) => {item.key = index; return item;});
    return (<View style={styles.container} ref='componentExisted'>
      <Header title='我的环保记录' back={() => Actions.popTo('_mine')} />
      {/* 环保记录列表 */}
      <FlatList style={styles.container} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.updateOrderList()} />}
                data={recordItems}
                renderItem={({item}) => <RecycleRecordItem style={styles.OrderItem} recordItem={item} authToken={this.props.identityToken.authToken} updateOrderList={() => this.updateOrderList()} />} />
    </View>);
  }

  // 单一入口页，数据采用本层管理
  async componentDidMount(){
    // 更新 环保记录列表数据
    await this.updateOrderList();
  }

  // 更新回收订单列表
  async updateOrderList(){
    const res = await request
      .get(config.api.myOrders, null, {'X-AUTH-TOKEN': this.props.identityToken.authToken})

    // 若请求正常、且数据正常
    if(res && !res.status && this.refs.componentExisted){
      this.setState({recordItems: res.data});
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  OrderItem: {
    marginBottom: 26,
  }
});

export default verifyLogin(EnvironmentalRecord);