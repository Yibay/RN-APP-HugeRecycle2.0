import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';


import Header from '../components/common/Header/Header';
import Navigator from '../components/common/Navigator/Navigator';
import ProductList from '../containers/Mall/ProductList';


class MallCategory extends Component{

  render(){
    // 过滤掉 空商品数组
    let mainCategoryList =[];
    let productList = [];
    // 过滤掉 productList item项为空数组的的项
    for(let i = 0; i<this.props.productList.length;i++){
      // 若该 Category 商品数大于0
      if(this.props.productList[i].length){
        // 保留其大类
        mainCategoryList.push(this.props.mainCategoryList[i]);
        // 保留其产品数组
        productList.push(this.props.productList[i]);
      }
    }
    return <View style={styles.container}>
      <Header title='分类浏览'/>
      <Navigator navigationItems={mainCategoryList.map(item => ({itemName: item.name}))}>
        {
          productList.map((item, index) => <ProductList key={index} productList={item}/>)
        }
      </Navigator>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

function mapStateToProps(state){
  return {
    mainCategoryList: state.mall.mallCategoryInfo.mainCategoryList,
    productList: state.mall.productList
  }
}

export default connect(mapStateToProps)(MallCategory);