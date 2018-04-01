import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, FlatList } from 'react-native';

import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import { verifyLogin } from '../HOC/verifyLogin';
import {fetchRecycleRecordThunk} from '../redux/actions/user/recycleRecord';

import Header from '../components/Header/Header';
import RecycleRecordItem from '../containers/RecycleRecord/RecycleRecordItem';


class EnvironmentalRecord extends Component {

  static propTypes = {
    fetchRecycleRecordThunk: PropTypes.func.isRequired,
    recycleRecord: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };
  
  render(){
    return (<View style={styles.container} ref='componentExisted'>
      <Header title='我的环保记录' back={() => Actions.popTo('_mine')} />
      {/* 环保记录列表 */}
      <FlatList style={styles.container} refreshControl={<RefreshControl refreshing={this.props.recycleRecord.isFetching} onRefresh={() => this.updateOrderList()} />}
                data={this.props.recycleRecord.data}
                renderItem={({item}) => <RecycleRecordItem style={styles.OrderItem} recordItem={item} authToken={this.props.identityToken.authToken} updateOrderList={() => this.updateOrderList()} />} />
    </View>);
  }

  // 单一入口页，数据采用本层管理
  componentDidMount(){
    // 更新 环保记录列表数据
    this.updateOrderList();
  }

  // 更新回收订单列表
  updateOrderList(){
    this.props.fetchRecycleRecordThunk();
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

function mapStateToProps(state){
  return {
    recycleRecord: state.user.recycleRecord
  }
}

export default verifyLogin(connect(mapStateToProps, {fetchRecycleRecordThunk})(EnvironmentalRecord));