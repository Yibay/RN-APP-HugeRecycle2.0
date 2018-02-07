import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import request from '../../../util/request/request';
import config from '../../../util/request/config';


import Header from '../../../components/common/Header/Header';
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
        <Text style={styles.msg}>找到下列与 {this.state.searchText} 相关的物品</Text>
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

    if(res && !res.status){
      this.setState({productList: res.data});
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // 内容区
  content: {
    flex: 1
  },
  // 搜索框
  searchInput: {
    marginTop: 20,
    width: 700,
    alignSelf: 'center'
  },
  // 结果提示语
  msg: {
    padding: 25,
    fontSize: 26
  }
});

function mapStateToProps(state){
  return {
    storeId: state.mall.storeInfo[0].storeId
  }
}

export default connect(mapStateToProps)(MallSearch);