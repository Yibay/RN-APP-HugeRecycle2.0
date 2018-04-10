import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import {fetchSearchGoods} from '../../../redux/actions/mall/searchGoods';

import Header from '../../../components/Header/Header';
import SearchInput from '../../../containers/Mall/SearchInput';
import ProductList from '../../../containers/Mall/ProductList';


class MallSearch extends Component {

  static propTypes = {
    searchText: PropTypes.string.isRequired,
    searchGoods: PropTypes.shape({ // 搜索结果
      data: PropTypes.array.isRequired,
      isFetching: PropTypes.bool.isRequired
    }),
    fetchSearchGoods: PropTypes.func.isRequired
  };

  static defaultProps = {
    searchText: ''
  };

  constructor(props){
    super(props);

    this.state = {
      searchText: props.searchText, // 搜索词
    };
  }

  render(){

    return <View style={styles.container}>
      <Header title='搜索结果'/>
      <View style={styles.content}>
        <SearchInput style={styles.searchInput} searchText={this.state.searchText} onChangeText={val => this.setState({searchText: val})} onSearch={() => this.props.fetchSearchGoods(this.state.searchText)}/>
        <Text style={styles.msg}>找到下列与 <Text style={styles.goods}>{this.state.searchText}</Text> 相关的物品</Text>
        <ProductList productList={this.props.searchGoods.data}/>
      </View>
    </View>
  }

  componentDidMount(){
    this.props.fetchSearchGoods(this.state.searchText);
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
    searchGoods: state.mall.searchGoods
  }
}

// 需验证绑定便利店
export default connect(mapStateToProps, {fetchSearchGoods})(MallSearch);