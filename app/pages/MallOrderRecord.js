import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import PropType from 'prop-types';


import Header from "../components/Header/Header";
import request from "../util/request/request";
import config from '../util/request/config';
import {verifyLogin} from "../HOC/verifyLogin";


class MallOrderRecord extends Component {

  static propTypes = {
    identityToken: PropType.shape({
      authToken: PropType.string.isRequired
    })
  };

  constructor(props){
    super(props);

    this.state = {
      mallOrderList: [],
      renderedOrderList: []
    }
  }

  render(){
    console.log(this.state.mallOrderList,this.state.renderedOrderList);
    return <View style={styles.container}>
      <Header title='我的消费订单'/>
      <FlatList
        style={styles.content}
        data={this.state.mallOrderList}
        renderItem={({item}) => <View/>}
        onEndReached={() => this.lazyLoadList()}
        onEndReachedThreshold={0.5}/>
    </View>
  }

  async componentDidMount(){
    await this.getMallOrderList();
  }

  // 获取商城订单列表（1，未支付；2，已支付待配送；3，配送中；4，已完成）
  async getMallOrderList(){
    let res = await Promise.all([
      // request.get(config.api.getMallOrderList, {orderType: 'unPayCount'}, {'X-AUTH-TOKEN': this.props.identityToken.authToken}),
      request.get(config.api.getMallOrderList, {orderType: 'payedCount'}, {'X-AUTH-TOKEN': this.props.identityToken.authToken}),
      request.get(config.api.getMallOrderList, {orderType: 'deliveringCount'}, {'X-AUTH-TOKEN': this.props.identityToken.authToken}),
      request.get(config.api.getMallOrderList, {orderType: 'completedCount'}, {'X-AUTH-TOKEN': this.props.identityToken.authToken})
    ])
    let mallOrderList = res
      .map(val => val && !val.status ? val.data : [])
      .reduce((preVal, curVal) => preVal.concat(curVal))
    this.setState({
      mallOrderList,
      renderedOrderList: mallOrderList.slice(0,10)
    });
  }

  // 懒加载列表
  lazyLoadList(){
    if(this.state.renderedOrderList.length < this.state.mallOrderList.length){
      this.setState({
        renderedOrderList: this.state.renderedOrderList.concat(this.state.mallOrderList.slice(this.state.renderedOrderList.length, this.state.renderedOrderList.length + 10))
      })
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  content: {
    flex: 1
  }
});

export default verifyLogin(MallOrderRecord);