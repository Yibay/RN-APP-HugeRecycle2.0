import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';

import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';


import {addCart} from '../../redux/actions/mall/shoppingCart';

import ProductItem from './ProductItem/ProductItem';
import AddBtn from '../../components/Form/Btn/AddBtn';
import CartBtn from '../../components/Form/Btn/CartBtn/CartBtn';


class ProductList extends Component {

  static propTypes = {
    productList: PropTypes.arrayOf(
      PropTypes.shape({
        storeProductId: PropTypes.number.isRequired,
        productImgAddress: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        productOriginalPrice: PropTypes.number.isRequired,
        hugePrice: PropTypes.number.isRequired
      })
    ),
    // 列表头部组件
    // ListHeaderComponent: PropTypes.element.isRequired
    addCart: PropTypes.func.isRequired
  };

  static defaultProps = {
    productList: []
  };

  constructor(props){
    super(props);

    this.state = {
      // FlatList data 中每项，需要 key
      productList: this.props.productList.slice(0,10).map(item => ({ ...item, key: item.storeProductId }))
    };
  }

  componentWillReceiveProps(nextProps){
    // FlatList data 中每项，需要 key
    this.setState({productList: nextProps.productList.slice(0,10).map(item => ({ ...item, key: item.storeProductId })) })
  }

  render(){
    return <View style={styles.container}>
      <FlatList
        data={this.state.productList}
        renderItem={({item, index}) =>  <ProductItem style={index % 2 === 0 ? styles.firstItem : styles.item} product={item} addToCart={<AddBtn callBack={() => this.props.addCart(item.storeProductId)} />} />}
        numColumns={2}
        onEndReached={() => {this.lazyLoadProducts()}}
        onEndReachedThreshold={0.5} // 外层不能为Scroll类组件，否则 此属性判定异常
        ListHeaderComponent={this.props.ListHeaderComponent}
        ListFooterComponent={(this.state.productList.length !== this.props.productList.length) ? <ActivityIndicator style={styles.activityIndicator} size='large'/> :  undefined}
      />
      <CartBtn style={styles.cartBtn} onPress={() => {Actions.mallCart()}} num={this.props.cartNum}/>
    </View>
  }

  // 懒加载 产品列表
  lazyLoadProducts(){
    if(this.state.productList.length === this.props.productList.length) return;
    this.setState(state => ({
      productList: state.productList.concat(this.props.productList.slice(state.productList.length, this.state.productList.length + 10).map(item => ({ ...item, key: item.storeProductId })))
    }));
  }

}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1
  },
  item: {
    marginRight: 30,
    marginBottom: 14
  },
  firstItem: {
    marginLeft: 30,
    marginRight: 10,
    marginBottom: 14
  },
  // 购物车
  cartBtn: {
    position: 'absolute',
    bottom: 100,
    right: 30
  },
  // loading icon
  activityIndicator: {
    marginVertical: 40,
    transform: [{scale: 2}]
  }
});

function mapStateToProps(state){
  return {
    cartNum: state.mall.shoppingCart.data.amount
  }
}

export default connect(mapStateToProps,{addCart})(ProductList);