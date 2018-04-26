import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, Image } from 'react-native';

import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import { verifyLogin } from '../HOC/verifyLogin';
import {onEnter} from "../redux/actions/pagesLife/RecycleRecordLife";

import Header from '../components/Header/Header';
import RecycleRecordItem from '../containers/RecycleRecord/RecycleRecordItem';
import FlatListDefault from "../components/List/FlatListDefault";


class EnvironmentalRecord extends Component {

  static propTypes = {
    onEnter: PropTypes.func.isRequired,
    recycleRecord: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };
  
  render(){
    return (<View style={styles.container}>
      <Header title='我的环保记录' back={() => Actions.popTo('_mine')} />
      {/* 环保记录列表 */}
      <FlatListDefault style={styles.content}
                       refreshControl={<RefreshControl refreshing={this.props.recycleRecord.isFetching} onRefresh={() => this.props.onEnter()} />}
                       data={this.props.recycleRecord.data}
                       renderItem={({item}) => <RecycleRecordItem style={styles.OrderItem} recordItem={item} updateOrderList={() => this.props.onEnter()} />}
                       onEndReachedThreshold={1}
                       isFetching={this.props.recycleRecord.isFetching}
                       ListEmptyComponentText='暂无环保记录'
      />
    </View>);
  }

  // 单一入口页，数据采用本层管理
  componentDidMount(){
    // 更新 环保记录列表数据
    this.props.onEnter();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  },
  OrderItem: {
    marginBottom: 26,
  },
  ListFooterComponent:{
    marginBottom: 26,
  },
  ListFooterComponentText: {
    fontSize: 26,
    color: '#888',
    textAlign: 'center'
  }
});

function mapStateToProps(state){
  return {
    recycleRecord: state.user.recycleRecord
  }
}

export default verifyLogin(connect(mapStateToProps, {onEnter})(EnvironmentalRecord));