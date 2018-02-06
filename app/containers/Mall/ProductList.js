import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';


import ProductItem from '../../components/pages/Mall/ProductItem';
import AddBtn from '../../components/common/Form/Btn/AddBtn';
import CartBtn from '../../components/common/Form/Btn/CartBtn';


class ProductList extends Component {

  static propTypes = {
    productList: PropTypes.arrayOf(
      PropTypes.shape({
        smallMallProductImgPath: PropTypes.string.isRequired,
        mallProductName: PropTypes.string.isRequired,
        mallProductPrice: PropTypes.number.isRequired,
        hugePrice: PropTypes.number.isRequired
      })
    ),
    // 列表头部组件
    // ListHeaderComponent: PropTypes.element.isRequired
  };

  static defaultProps = {
    productList: []
  };

  constructor(props){
    super(props);

    this.state = {
      // FlatList data 中每项，需要 key
      productList: this.props.productList.slice(0,10).map(item => ({ ...item, key: item.mallProductId }))
    };
  }

  componentWillReceiveProps(nextProps){
    // FlatList data 中每项，需要 key
    this.setState({productList: nextProps.productList.slice(0,10).map(item => ({ ...item, key: item.mallProductId })) })
  }

  render(){
    return <View style={styles.container}>
      <FlatList
        data={this.state.productList}
        renderItem={({item}) =>  <ProductItem product={item} addToCart={<AddBtn/>} />}
        numColumns={2}
        onEndReached={() => {this.lazyLoadProducts()}}
        onEndReachedThreshold={0.5} // 外层不能为Scroll类组件，否则 此属性判定异常
        ListHeaderComponent={this.props.ListHeaderComponent}
      />
      <CartBtn style={styles.cartBtn} onPress={() => {Actions.mallCart()}}/>
    </View>
  }

  // 懒加载 产品列表
  lazyLoadProducts(){
    if(this.state.productList.length === this.props.productList.length) return;
    this.setState(state => ({
      productList: state.productList.concat(this.props.productList.slice(state.productList.length, this.state.productList.length + 10).map(item => ({ ...item, key: item.mallProductId })))
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  cartBtn: {
    position: 'absolute',
    bottom: 100,
    right: 10
  }
});

export default ProductList;