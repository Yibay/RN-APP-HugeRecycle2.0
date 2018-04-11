import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, FlatList, Text, ActivityIndicator } from 'react-native';

import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


import { verifyLogin } from '../HOC/verifyLogin';
import {onEnter} from "../redux/actions/pagesLife/RecycleRecordLife";

import Header from '../components/Header/Header';
import RecycleRecordItem from '../containers/RecycleRecord/RecycleRecordItem';


class EnvironmentalRecord extends Component {

  static propTypes = {
    onEnter: PropTypes.func.isRequired,
    recycleRecord: PropTypes.shape({
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    })
  };

  constructor(props){
    super(props);

    this.state = {
      recycleRecord: this.props.recycleRecord.data,
      recycleRecordShow: this.props.recycleRecord.data.slice(0, 10)
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      recycleRecord: nextProps.recycleRecord.data,
      recycleRecordShow: nextProps.recycleRecord.data.slice(0, 10)
    })
  }
  
  render(){
    return (<View style={styles.container}>
      <Header title='我的环保记录' back={() => Actions.popTo('_mine')} />
      {/* 环保记录列表 */}
      <FlatList style={styles.content}
                refreshControl={<RefreshControl refreshing={this.props.recycleRecord.isFetching} onRefresh={() => this.props.onEnter()} />}
                data={this.state.recycleRecordShow}
                renderItem={({item}) => <RecycleRecordItem style={styles.OrderItem} recordItem={item} authToken={this.props.identityToken.authToken} updateOrderList={() => this.props.onEnter()} />}
                onEndReached={() => this.lazyLoad()}
                onEndReachedThreshold={1}
                ListFooterComponent={
                  this.state.recycleRecordShow.length === this.state.recycleRecord.length ?
                    this.state.recycleRecordShow.length !== 0 ?
                      <Text style={[styles.ListFooterComponent, styles.ListFooterComponentText]}>--- 我也是有底线的 ---</Text>
                      :
                      undefined
                    :
                    <ActivityIndicator size='large' style={styles.ListFooterComponent}/>
                } />
    </View>);
  }

  // 单一入口页，数据采用本层管理
  componentDidMount(){
    // 更新 环保记录列表数据
    this.props.onEnter();
  }

  lazyLoad(){
    if(this.state.recycleRecordShow.length < this.state.recycleRecord.length){
      this.setState(state => ({
        recycleRecordShow: state.recycleRecordShow.concat(state.recycleRecord.slice(state.recycleRecordShow.length, state.recycleRecordShow.length + 10))
      }));
    }
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