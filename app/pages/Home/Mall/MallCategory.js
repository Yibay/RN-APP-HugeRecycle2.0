import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import Header from '../../../components/Header/Header';
import Navigator from '../../../components/Navigator/Navigator';
import ProductList from '../../../containers/Mall/ProductList';


class MallCategory extends Component{

  static propTypes = {
    storeGoods: PropTypes.shape({
      data: PropTypes.shape({
        bannerList: PropTypes.array.isRequired,
        mainCategoryList: PropTypes.array.isRequired,
        productList: PropTypes.array.isRequired
      }),
      isFetching: PropTypes.bool.isRequired
    }),
    categoryId: PropTypes.number // 商城首页 跳转过来是，传参 判定 选中大类
  };

  render(){

    let mainCategoryList = this.props.storeGoods.data.mainCategoryList;
    let productList = this.props.storeGoods.data.productList;

    // 根据路由传来的categoryId, 确定 初始选中页面index
    let selectPageIndex = 0;
    for(let i=0;i<mainCategoryList.length;i++){
      if(mainCategoryList[i].id === this.props.categoryId){
        selectPageIndex = i;
        break;
      }
    }

    return <View style={styles.container}>
      <Header title='分类浏览'/>
      <Navigator navigationItems={mainCategoryList.map(item => ({itemName: item.name}))} selectPageIndex={selectPageIndex} contentLayoutStyle='highlyFlexible' style={styles.navigator} activeLineStyle={styles.activeLineStyle}>
        {
          productList.map((item, index) => <ProductList key={index} productList={item}/>)
        }
      </Navigator>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  // 导航条
  navigator: {
    borderBottomWidth: 0
  },
  activeLineStyle: {
    borderColor: '#f7f7f7'
  }
});

function mapStateToProps(state){
  return {
    storeGoods: state.mall.storeGoods
  }
}

export default connect(mapStateToProps)(MallCategory);