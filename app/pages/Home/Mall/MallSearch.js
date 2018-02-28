import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import request from '../../../util/request/request';
import config from '../../../util/request/config';
import { verifyStoreInfo } from '../../../HOC/verifyStoreInfo';

import Header from '../../../components/Header/Header';
import SearchInput from '../../../containers/Mall/SearchInput';
import ProductList from '../../../containers/Mall/ProductList';


class MallSearch extends Component {

  static propTypes = {
    searchText: PropTypes.string.isRequired
  };

  static defaultProps = {
    searchText: ''
  };

  constructor(props){
    super(props);

    this.state = {
      searchText: props.searchText, // 搜索词
      productList: [] // 搜索结果
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({searchText: nextProps.searchText});
  }

  render(){

    return <View style={styles.container}>
      <Header title='搜索结果'/>
      <View style={styles.content}>
        <SearchInput style={styles.searchInput} searchText={this.state.searchText} onChangeText={val => this.setState({searchText: val})} onSearch={() => this.searchProduct()}/>
        <Text style={styles.msg}>找到下列与 <Text style={styles.goods}>{this.state.searchText}</Text> 相关的物品</Text>
        <ProductList productList={this.state.productList}/>
      </View>
    </View>
  }

  componentDidMount(){
    this.searchProduct();
  }

  // 搜索商品
  async searchProduct(){
    const res = await request.get(config.api.searchProduct, {
      storeId: this.props.storeId,
      searchType: 'productName',
      searchVal: this.state.searchText
    });
    console.log(res);

    if(res && !res.status){
      this.setState({productList: res.data});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 内容区
  content: {
    flex: 1
  },
  // 搜索框
  searchInput: {
    alignSelf: 'center',
    marginVertical: 20,
    width: 686,
    height: 56,
    borderRadius: 26,
    backgroundColor: '#ececec'
  },
  // 结果提示语
  msg: {
    paddingBottom: 20,
    paddingHorizontal: 32,
    fontSize: 28,
    color: '#000'
  },
  goods: {
    fontSize: 28,
    color: '#ef3300'
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.store.storeInfo[state.mall.store.storeIndex].storeId
  }
}

// 需验证绑定便利店
export default verifyStoreInfo(connect(mapStateToProps)(MallSearch));